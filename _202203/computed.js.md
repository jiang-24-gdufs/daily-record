```js
import * as Cesium from '@smart/cesium';

// 笛卡坐标转换经纬度
function cartesianToDegree(cartesian) {
  const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
  const degree = {
    longitude: Cesium.Math.toDegrees(cartographic.longitude),
    latitude: Cesium.Math.toDegrees(cartographic.latitude),
    height: cartographic.height,
  };
  return degree;
}

/**
 * 计算两点空间距离
 * @private
 *
 * @param {Cartesian3} stPoint 起点
 * @param {Cartesian3} edPoint 终点
 * @returns {Number} 返回结果距离
 */
export function computedDistance(stPoint, edPoint) {debugger;
  // return Cesium.Cartesian3.distance(stPoint, edPoint);
  const point1cartographic = Cesium.Cartographic.fromCartesian(stPoint);
  const point2cartographic = Cesium.Cartographic.fromCartesian(edPoint);
  // 根据经纬度计算出距离
  const geodesic = new Cesium.EllipsoidGeodesic();
  geodesic.setEndPoints(point1cartographic, point2cartographic);
  let s = geodesic.surfaceDistance;
  s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
  return s;
}

/**
 * 计算面积
 * @param {Cartesian3[]} points 点集合
 * @returns {Number} 返回结果面积
 */
export function computedArea(points) {
  if (points.length <= 2) {
    console.warn('compunted area must be three point or up');
    return;
  }
  let res = 0;
  const startPoint = points[0];
  for (let i = 0; i < points.length - 2; i++) {
    const direction = getTriangleDirection(startPoint, points[i + 1], points[i + 2]);
    const angleInRadians = Cesium.Cartesian3.angleBetween(
      Cesium.Cartesian3.subtract(points[i + 1], startPoint, new Cesium.Cartesian3()),
      Cesium.Cartesian3.subtract(points[i + 2], startPoint, new Cesium.Cartesian3())
    );

    const disOA = Cesium.Cartesian3.distance(startPoint, points[i + 1]);
    const disOB = Cesium.Cartesian3.distance(startPoint, points[i + 2]);
    res += direction * 0.5 * disOA * disOB * Math.sin(angleInRadians);
  }
  return Math.abs(res);
}

/**
 * 计算非竖直平面上的任意三角形顺逆,
 * 顺为 1， 逆为 -1（+竖直平面上的三角形）
 * @private
 *
 * @param point1 第一点 0——起点
 * @param point2 第二点 A
 * @param point3 第三点 B
 */
function getTriangleDirection(point1, point2, point3) {
  let direction = 1;
  const azimuthOA = computedAzimuth(point1, point2);
  const azimuthOB = computedAzimuth(point1, point3);
  if (azimuthOB > azimuthOA) {
    if (azimuthOB - 180 > azimuthOA) {
      direction = -1;
    }
  } else if (azimuthOB < azimuthOA) {
    if (azimuthOA - 180 < azimuthOB) {
      direction = -1;
    }
  } else {
    console.warn('getTriangleDirection: 三点在同一竖直面上无法判断方向', point1, point2, point3);
    direction = -1;
  }
  return direction;
}

/**
 * 方位角计算
 * @private
 *
 * @param point1 Cartesian3 起点/观察点
 * @param point2 Cartesian3 终点/目标点
 *
 * @returns 返回方位角度
 */
function computedAzimuth(point1, point2) {
  const pA = cartesianToDegree(point1);
  const pB = cartesianToDegree(point2);

  let dRotateAngle = Math.atan2(Math.abs(pA.longitude - pB.longitude), Math.abs(pA.latitude - pB.latitude));
  if (pB.longitude >= pA.longitude) {
    if (pB.latitude >= pA.latitude) {
    } else {
      dRotateAngle = Math.PI - dRotateAngle;
    }
  } else {
    if (pB.latitude >= pA.latitude) {
      dRotateAngle = 2 * Math.PI - dRotateAngle;
    } else {
      dRotateAngle = Math.PI + dRotateAngle;
    }
  }
  dRotateAngle = (dRotateAngle * 180) / Math.PI;
  return dRotateAngle;
}

/**
 * 计算角度，通过经纬度坐标
 * @param {Cartographic} p1 起点
 * @param {Cartographic} p2 中间点
 * @param {Cartographic} p3 终点
 */
export function computedAngle(p1, p2, p3) {
  const bearing1 = computedBearing(p2, p1);
  const bearing2 = computedBearing(p2, p3);
  let angle = bearing1 - bearing2;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}

/**
 * 计算角度方位，通过两点经纬度
 * @param {Cartographic} from 起点
 * @param {Cartographic} to 终点
 * @returns {Number} 返回方位角度
 */
export function computedBearing(from, to) {
  const radiansPerDegree = Math.PI / 180.0;
  const degreesPerRadian = 180.0 / Math.PI;
  const lat1 = from.latitude * radiansPerDegree;
  const lon1 = from.longitude * radiansPerDegree;
  const lat2 = to.latitude * radiansPerDegree;
  const lon2 = to.longitude * radiansPerDegree;
  let angle = -Math.atan2(
    Math.sin(lon1 - lon2) * Math.cos(lat2),
    Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)
  );
  if (angle < 0) {
    angle += Math.PI * 2.0;
  }
  angle = angle * degreesPerRadian;
  return angle;
}

/**
 * 计算中心点，返回cartesian3
 * @param {Cartesian3[]} positions 点集合
 *
 * @returns {Cartesian3} 返回中心点
 */
export function computedMidPoint(positions) {
  let point = null;
  let longitude = 0;
  let latitude = 0;
  let height = 0;
  positions.forEach(function(p) {
    longitude += cartesianToDegree(p).longitude;
    latitude += cartesianToDegree(p).latitude;
    height += cartesianToDegree(p).height;
  });
  const num = positions.length;
  point = Cesium.Cartesian3.fromDegrees(longitude / num, latitude / num, height / num);
  return point;
}

const scratchCartesian31 = new Cesium.Cartesian3();
const scratchCartesian32 = new Cesium.Cartesian3();
function triangleArea(p0, p1, p2) {
  const v0 = Cesium.Cartesian3.subtract(p0, p1, scratchCartesian31);
  const v1 = Cesium.Cartesian3.subtract(p2, p1, scratchCartesian32);

  const crossResult = Cesium.Cartesian3.cross(v0, v1, v0);
  return 0.5 * Cesium.Cartesian3.magnitude(crossResult);
}

function trianglesArea(positions, indices) {
  const length = indices.length;
  let area = 0;

  for (let i = 0; i < length; i += 3) {
    const i0 = indices[i];
    const i1 = indices[i + 1];
    const i2 = indices[i + 2];

    area += triangleArea(positions[i0], positions[i1], positions[i2]);
  }

  return area;
}

// see PolygonGeometry.createGeometry
export function computePolygonTriangulationArea(positions, ellipsoid) {
  const polygonHierarchy = new Cesium.PolygonHierarchy(positions);

  const tangentPlane = Cesium.EllipsoidTangentPlane.fromPoints(positions, ellipsoid);

  const perPositionHeight = true;
  const results = Cesium.PolygonGeometryLibrary.polygonsFromHierarchy(
    polygonHierarchy,
    tangentPlane.projectPointsOntoPlane.bind(tangentPlane),
    !perPositionHeight,
    ellipsoid
  );

  const hierarchy = results.hierarchy;
  const polygons = results.polygons;

  if (hierarchy.length === 0) {
    return 0;
  }

  let area = 0;
  for (const polygon of polygons) {
    let indices = Cesium.PolygonPipeline.triangulate(polygon.positions2D, polygon.holes);

    /* If polygon is completely unrenderable, just use the first three vertices */
    if (indices.length < 3) {
      indices = [0, 1, 2];
    }

    area += trianglesArea(polygon.positions, indices);
  }

  return area;
}

```

