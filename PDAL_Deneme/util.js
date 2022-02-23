const returnXML = () => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <pc:PointCloudSchema xmlns:pc="http://pointcloud.org/schemas/PC/"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
       <pc:dimension>
           <pc:position>1</pc:position>
           <pc:size>2</pc:size>
           <pc:description>Representation of the pulse return magnitude</pc:description>
           <pc:name>Intensity</pc:name>
           <pc:interpretation>uint16_t</pc:interpretation>
           <pc:active>true</pc:active>
       </pc:dimension>
       <pc:dimension>
           <pc:position>2</pc:position>
           <pc:size>8</pc:size>
           <pc:description>GPS time that the point was acquired</pc:description>
           <pc:name>GpsTime</pc:name>
           <pc:interpretation>double</pc:interpretation>
           <pc:active>true</pc:active>
       </pc:dimension>
       <pc:dimension>
           <pc:position>3</pc:position>
           <pc:size>8</pc:size>
           <pc:description>X coordinate</pc:description>
           <pc:name>X</pc:name>
           <pc:interpretation>double</pc:interpretation>
           <pc:active>true</pc:active>
       </pc:dimension>
       <pc:dimension>
           <pc:position>4</pc:position>
           <pc:size>8</pc:size>
           <pc:description>Y coordinate</pc:description>
           <pc:name>Y</pc:name>
           <pc:interpretation>double</pc:interpretation>
           <pc:active>true</pc:active>
       </pc:dimension>
       <pc:dimension>
           <pc:position>5</pc:position>
           <pc:size>8</pc:size>
           <pc:description>Z coordinate</pc:description>
           <pc:name>Z</pc:name>
           <pc:interpretation>double</pc:interpretation>
           <pc:active>true</pc:active>
       </pc:dimension>
       <pc:metadata>
           <Metadata name="compression" type="string">dimensional</Metadata>
       </pc:metadata>
       <pc:orientation>point</pc:orientation>
       <pc:version>1.3</pc:version>
    </pc:PointCloudSchema>`
}

module.exports = {
    returnXML
}