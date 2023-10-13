{
  Capabilities:
    Contents: Layer: (70) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    TileMatrixSet: (5) [{…}, {…}, {…}, {…}, {…}]
  [[Prototype]]: Object
  ServiceMetadataURL: (2) [{…}, {…}]
  ows:OperationsMetadata: {ows:Operation: Array(3)}
  ows:ServiceIdentification: {ows:Title: 'GeoServer Web Map Tile Service', ows:Abstract: 'A compliant implementation of WMTS service.', ows:Keywords: '', ows:ServiceType: 'OGC WMTS', ows:ServiceTypeVersion: '1.0.0', …}
  ows:ServiceProvider: {ows:ProviderName: 'http://geoserver.org', ows:ServiceContact: {…}}
  version: "1.0.0"
  xmlns: "http://www.opengis.net/wmts/1.0"
  xmlns:gml: "http://www.opengis.net/gml"
  xmlns:ows: "http://www.opengis.net/ows/1.1"
  xmlns:xlink: "http://www.w3.org/1999/xlink"
  xmlns:xsi: "http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation: "http://www.opengis.net/wmts/1.0 http://schemas.opengis.net/wmts/1.0/wmtsGetCapabilities_response.xsd"
}

{
    "Layer": [
        {
            "ows:Title": "fangwuzhuang84",
            "ows:WGS84BoundingBox": {
                "ows:LowerCorner": "115.99327932908301 36.4480305671296",
                "ows:UpperCorner": "115.99598264681826 36.449768291384096"
            },
            "ows:Identifier": "cite:fangwuzhuang84",
            "Style": {
                "isDefault": true,
                "ows:Identifier": "cite:fangwuzhaung",
                "LegendURL": {
                    "format": "image/png",
                    "xlink:href": "http://172.16.115.29:8080/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=103&height=20&layer=cite%3Afangwuzhuang84",
                    "width": 103,
                    "height": 20
                }
            },
            "Format": [
                "image/png",
                "image/jpeg"
            ],
            "InfoFormat": [
                "text/plain",
                "application/vnd.ogc.gml",
                "text/xml",
                "application/vnd.ogc.gml/3.1.1",
                "text/xml",
                "text/html",
                "application/json"
            ],
            "TileMatrixSetLink": [],
            "ResourceURL": [
                {
                    "format": "image/png",
                    "resourceType": "tile",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/cite:fangwuzhuang84/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"
                },
                {
                    "format": "image/jpeg",
                    "resourceType": "tile",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/cite:fangwuzhuang84/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/jpeg"
                },
                {
                    "format": "text/plain",
                    "resourceType": "FeatureInfo",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/cite:fangwuzhuang84/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"
                },
                {
                    "format": "application/vnd.ogc.gml",
                    "resourceType": "FeatureInfo",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/cite:fangwuzhuang84/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"
                },
                {
                    "format": "text/xml",
                    "resourceType": "FeatureInfo",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/cite:fangwuzhuang84/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/xml"
                },
                {
                    "format": "application/vnd.ogc.gml/3.1.1",
                    "resourceType": "FeatureInfo",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/cite:fangwuzhuang84/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml/3.1.1"
                },
                {
                    "format": "text/xml",
                    "resourceType": "FeatureInfo",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/cite:fangwuzhuang84/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/xml"
                },
                {
                    "format": "text/html",
                    "resourceType": "FeatureInfo",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/cite:fangwuzhuang84/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"
                },
                {
                    "format": "application/json",
                    "resourceType": "FeatureInfo",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/cite:fangwuzhuang84/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/json"
                }
            ]
        },
        {
            "ows:Title": "DZjsyx",
            "ows:WGS84BoundingBox": {
                "ows:LowerCorner": "121.77989675784245 31.116325736899014",
                "ows:UpperCorner": "121.78308261173616 31.128677188213814"
            },
            "ows:Identifier": "shdzGX:DZjsyx",
            "Style": {
                "isDefault": true,
                "ows:Identifier": "shdzGX:1111",
                "LegendURL": {
                    "format": "image/png",
                    "xlink:href": "http://172.16.115.29:8080/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=348&height=600&layer=shdzGX%3ADZjsyx",
                    "width": 348,
                    "height": 600
                }
            },
            "Format": [
                "image/png",
                "image/jpeg"
            ],
            "InfoFormat": [
                "text/plain",
                "application/vnd.ogc.gml",
                "text/xml",
                "application/vnd.ogc.gml/3.1.1",
                "text/xml",
                "text/html",
                "application/json"
            ],
            "TileMatrixSetLink": [],
            "ResourceURL": [
                {
                    "format": "image/png",
                    "resourceType": "tile",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/shdzGX:DZjsyx/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"
                },
                {
                    "format": "image/jpeg",
                    "resourceType": "tile",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/shdzGX:DZjsyx/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/jpeg"
                },
                {
                    "format": "text/plain",
                    "resourceType": "FeatureInfo",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/shdzGX:DZjsyx/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"
                },
                {
                    "format": "application/vnd.ogc.gml",
                    "resourceType": "FeatureInfo",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/shdzGX:DZjsyx/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"
                },
                {
                    "format": "text/xml",
                    "resourceType": "FeatureInfo",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/shdzGX:DZjsyx/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/xml"
                },
                {
                    "format": "application/vnd.ogc.gml/3.1.1",
                    "resourceType": "FeatureInfo",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/shdzGX:DZjsyx/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml/3.1.1"
                },
                {
                    "format": "text/xml",
                    "resourceType": "FeatureInfo",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/shdzGX:DZjsyx/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/xml"
                },
                {
                    "format": "text/html",
                    "resourceType": "FeatureInfo",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/shdzGX:DZjsyx/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"
                },
                {
                    "format": "application/json",
                    "resourceType": "FeatureInfo",
                    "template": "http://172.16.115.29:8080/geoserver/gwc/service/wmts/rest/shdzGX:DZjsyx/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/json"
                }
            ]
        }],
    "TileMatrixSet": [
        {
            "ows:Identifier": "GlobalCRS84Pixel",
            "ows:SupportedCRS": "urn:ogc:def:crs:EPSG::4326",
            "TileMatrix": [
                {
                    "ows:Identifier": "GlobalCRS84Pixel:0",
                    "ScaleDenominator": 795139219.9519542,
                    "TopLeftCorner": "90.0 -180.0",
                    "TileWidth": 256,
                    "TileHeight": 256,
                    "MatrixWidth": 1,
                    "MatrixHeight": 1
                },
                {
                    "ows:Identifier": "GlobalCRS84Pixel:1",
                    "ScaleDenominator": 397569609.9759771,
                    "TopLeftCorner": "90.0 -180.0",
                    "TileWidth": 256,
                    "TileHeight": 256,
                    "MatrixWidth": 2,
                    "MatrixHeight": 1
                },
                {
                    "ows:Identifier": "GlobalCRS84Pixel:2",
                    "ScaleDenominator": 198784804.98798856,
                    "TopLeftCorner": "90.0 -180.0",
                    "TileWidth": 256,
                    "TileHeight": 256,
                    "MatrixWidth": 3,
                    "MatrixHeight": 2
                },
                {
                    "ows:Identifier": "GlobalCRS84Pixel:3",
                    "ScaleDenominator": 132523203.3253257,
                    "TopLeftCorner": "90.0 -180.0",
                    "TileWidth": 256,
                    "TileHeight": 256,
                    "MatrixWidth": 5,
                    "MatrixHeight": 3
                },
                {
                    "ows:Identifier": "GlobalCRS84Pixel:4",
                    "ScaleDenominator": 66261601.66266285,
                    "TopLeftCorner": "90.0 -180.0",
                    "TileWidth": 256,
                    "TileHeight": 256,
                    "MatrixWidth": 9,
                    "MatrixHeight": 5
                },
            ]
        },

    ]
}
