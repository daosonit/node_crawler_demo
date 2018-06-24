module.exports = {
  "up": "CREATE TABLE `crawler` (" +
  "  `id` VARCHAR() NULL," +
  "  `SubjectId` VARCHAR() NULL," +
  "  `typeId` VARCHAR() NULL," +
  "  `typeName` VARCHAR() NULL," +
  "  `partId` VARCHAR() NULL," +
  "  `partName` VARCHAR() NULL," +
  "  `subPartId` VARCHAR() NULL," +
  "  `subPartSeoId` VARCHAR() NULL," +
  "  `subPartName` VARCHAR() NULL," +
  "  `childSubPartId` VARCHAR() NULL," +
  "  `childSubPartName` VARCHAR() NULL," +
  "  `childSubPartSeoId` VARCHAR() NULL," +
  "  `childSubPartSeoTitle` VARCHAR() NULL," +
  "  `childSubPartSeoDescription` VARCHAR() NULL," +
  "  `batchId` VARCHAR() NULL," +
  "  `Showhome_serial` VARCHAR() NULL);",
  "down": ""
}