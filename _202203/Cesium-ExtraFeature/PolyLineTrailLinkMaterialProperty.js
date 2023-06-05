// const img = require('@assets/img/pipeflow.png');
// const img = require('@assets/source/img/flowdirection/arrow.png');
import img from '@assets/source/img/flowdirection/arrow.png';

/**
 * 自定义流动纹理线
 * @param {*} color 颜色
 * @param {*} duration  持续时间 毫秒
 */
function PolylineTrailLinkMaterialProperty(color, duration) {
  this._definitionChanged = new Cesium.Event();
  this._color = undefined;
  this._colorSubscription = undefined;
  this.color = color;
  this.duration = duration;
  this._time = new Date().getTime();
}

PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
  return 'PolylineTrailLink';
};
PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
  if (!Cesium.defined(result)) {
    result = {};
  }
  result.color = Cesium.Property.getValueOrClonedDefault(
    this._color,
    time,
    Cesium.Color.WHITE,
    result.color,
  );
  result.image = Cesium.Material.PolylineTrailLinkImage;
  // result.image = this.image;
  result.time = ((new Date().getTime() - this._time) % this.duration) / this.duration;
  return result;
};
PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
  return (
    this === other ||
    (other instanceof PolylineTrailLinkMaterialProperty && this._color.equals(other._color))
  );
};

Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty;
Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink';
Cesium.Material.PolylineTrailLinkImage = img;
Cesium.Material.PolylineTrailLinkSource =
  'czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                  {\n\
                                                       czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                       vec2 st = materialInput.st;\n\
                                                       vec4 colorImage = texture2D(image, vec2(fract(st.s*3.0-time)*8.0-0.2, st.t));\n\
                                                       material.alpha = colorImage.a * color.a;\n\
                                                       material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                                                       return material;\n\
                                                   }';

// 将自定义的类 原型链 加到cesium上
Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
  isConstant: {
    get: function () {
      return false;
    },
  },
  definitionChanged: {
    get: function () {
      return this._definitionChanged;
    },
  },
  color: Cesium.createPropertyDescriptor('color'),
});

Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
  fabric: {
    type: Cesium.Material.PolylineTrailLinkType,
    uniforms: {
      color: new Cesium.Color(1, 1, 1, 1),
      image: Cesium.Material.PolylineTrailLinkImage,
      // repeat: new Cesium.Cartesian2(1000, 10),
      // repeat: {x:10,y:1},
      time: 0,
    },
    source: Cesium.Material.PolylineTrailLinkSource,
  },
  translucent: function (material) {
    return true;
  },
});

export default PolylineTrailLinkMaterialProperty;
