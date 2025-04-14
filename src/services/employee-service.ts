// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const EmployeeService = {
//   async getAllEmployees() {
//     return prisma.employee.findMany();
//   },

//   async getEmployeeById(id: string) {
//     return prisma.employee.findUnique({ where: { id } });
//   },

//   async searchEmployees(query: string) {
//     return prisma.employee.findMany({
//       where: {
//         OR: [
//           { firstName: { contains: query } },
//           { lastName: { contains: query } },
//           { cin: { contains: query } },
//           { ppr: { contains: query } },
//         ],
//       },
//     });
//   },

//   async filterEmployees(filters: {
//     grade?: string;
//     division?: string;
//     service?: string;
//   }) {
//     return prisma.employee.findMany({
//       where: {
//         ...(filters.grade && { grade: filters.grade }),
//         ...(filters.division && { division: filters.division }),
//         ...(filters.service && { service: filters.service }),
//       },
//     });
//   },

//   async createEmployee(data: {
//     cin: string;
//     ppr: string;
//     firstName: string;
//     lastName: string;
//     grade: string;
//     division: string;
//     service: string;
//     address: string;
//     decisionNumber: string;
//     decisionDate: Date;
//   }) {
//     return prisma.employee.create({ data });
//   },

//   async updateEmployee(
//     id: string,
//     data: Partial<{
//       cin: string;
//       ppr: string;
//       firstName: string;
//       lastName: string;
//       grade: string;
//       division: string;
//       service: string;
//       address: string;
//       decisionNumber: string;
//       decisionDate: Date;
//     }>
//   ) {
//     return prisma.employee.update({ where: { id }, data });
//   },

//   async deleteEmployee(id: string) {
//     return prisma.employee.delete({ where: { id } });
//   },
// };
