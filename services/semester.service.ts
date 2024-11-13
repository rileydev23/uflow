// [
// 	{
// 		"_id": "6733e924c727c3ef21cca08c",
// 		"name": "Semestre 3",
// 		"year": 2024,
// 		"startDate": "2024-01-15T00:00:00.000Z",
// 		"endDate": "2024-12-15T00:00:00.000Z",
// 		"subjects": [
// 			{
// 				"_id": "6733ec106b4e0b98d238eb67",
// 				"name": "PRUEBAS DE SOFTWARE",
// 				"events": [],
// 				"code": "ICC735",
// 				"average": 0
// 			}
// 		],
// 		"average": 0,
// 		"weeksDuration": 100,
// 		"currentWeek": 44
// 	}
// ]

interface ISubject {
  _id: string;
  name: string;
  events: any[];
  code: string;
  average: number;
}

export interface ISemester {
  _id: string;
  name: string;
  year: number;
  startDate: string;
  endDate: string;
  subjects: ISubject[];
  average: number;
  weeksDuration: number;
  currentWeek: number;
}

export async function getAllSemesters(
  userId: string,
  token: string
): Promise<ISemester[]> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL_UFLOW}/api/users/${userId}/semesters`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  throw new Error(json?.error || "Failed to get all semesters");
}
