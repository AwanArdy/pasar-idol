export const getGroupColors = (groupName: string) => {
  const group = groupName.toLowerCase();

  switch (group) {
    case "Nogizaka46":
      return 'text-[#99409C]';

    case "Hinatazaka46":
      return 'text-[#5BBEE4]';

    case "Sakurazaka46":
      return 'text-[#E39AAF]';

    default:
      return 'text-gray-600';
  }
};
