export const getGroupColors = (groupName: string) => {
  switch (groupName.toLowerCase()) {
    case "nogizaka46":
      return "text-[#99409C]";
    case "hinatazaka46":
      return "text-[#5BBEE4]";
    case "sakurazaka46":
      return "text-[#E39AAF]";
    default:
      return "text-gray-600";
  }
};
