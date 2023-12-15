export function groupAndMergeDataByKey({
  filterBy,
  data,
}: {
  filterBy: string;
  data?: {
    [key: string]: any;
  }[];
}) {
  if (!data) return;

  const groupedData = {} as (typeof data)[number];

  data.map((item) => {
    const filterKey = item[filterBy];

    if (!groupedData[filterKey]) {
      // If the filterKey is not already in the groupedData, add it
      groupedData[filterKey] = item;
    } else {
      // If the filterKey is already in the groupedData, override the values
      groupedData[filterKey] = { ...groupedData[filterKey], ...item };
    }
  });

  // Convert the groupedData object back to an array
  const result = Object.values(groupedData);

  return result;
}
