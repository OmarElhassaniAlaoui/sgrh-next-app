// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import { Employee, LeaveRequest } from '@prisma/client';
// import { formatDate, getLeaveTypeName } from './index';

// /**
//  * Generate a leave slip PDF for an approved leave
//  */
// export const generateLeaveSlip = (
//   employee: Employee,
//   leaveRequest: LeaveRequest,
//   replacement?: Employee
// ): jsPDF => {
//   const doc = new jsPDF();

//   // Add header
//   doc.setFontSize(18);
//   doc.text('Leave Management System', 105, 20, { align: 'center' });
//   doc.setFontSize(14);
//   doc.text('Leave Slip', 105, 30, { align: 'center' });

//   // Add employee information
//   doc.setFontSize(12);
//   doc.text(`Employee: ${employee.firstName} ${employee.lastName}`, 20, 50);
//   doc.text(`CIN: ${employee.cin}`, 20, 60);
//   doc.text(`PPR: ${employee.ppr}`, 20, 70);
//   doc.text(`Grade: ${employee.grade}`, 20, 80);
//   doc.text(`Division: ${employee.division}`, 20, 90);
//   doc.text(`Service: ${employee.service}`, 20, 100);

//   // Add leave information
//   doc.text(`Leave Type: ${getLeaveTypeName(leaveRequest.leaveType)}`, 20, 120);
//   doc.text(`Start Date: ${formatDate(leaveRequest.startDate)}`, 20, 130);
//   doc.text(`End Date: ${formatDate(leaveRequest.endDate)}`, 20, 140);
//   doc.text(`Duration: ${leaveRequest.duration} working days`, 20, 150);

//   if (replacement) {
//     doc.text(`Replacement: ${replacement.firstName} ${replacement.lastName}`, 20, 160);
//   }

//   if (leaveRequest.reason) {
//     doc.text(`Reason: ${leaveRequest.reason}`, 20, 170);
//   }

//   // Add approval information
//   doc.text(`Status: Approved`, 20, 190);
//   if (leaveRequest.approvedAt) {
//     doc.text(`Approved on: ${formatDate(leaveRequest.approvedAt)}`, 20, 200);
//   }
//   if (leaveRequest.approvedBy) {
//     doc.text(`Approved by: ${leaveRequest.approvedBy}`, 20, 210);
//   }

//   // Add signature space
//   doc.text('Employee Signature', 40, 240);
//   doc.text('Manager Signature', 150, 240);

//   return doc;
// };

// /**
//  * Generate a leave history report for an employee
//  */
// export const generateLeaveHistory = (
//   employee: Employee,
//   leaveRequests: LeaveRequest[]
// ): jsPDF => {
//   const doc = new jsPDF();

//   // Add header
//   doc.setFontSize(18);
//   doc.text('Leave Management System', 105, 20, { align: 'center' });
//   doc.setFontSize(14);
//   doc.text(`Leave History: ${employee.firstName} ${employee.lastName}`, 105, 30, { align: 'center' });

//   // Add employee information
//   doc.setFontSize(12);
//   doc.text(`CIN: ${employee.cin}`, 20, 50);
//   doc.text(`PPR: ${employee.ppr}`, 20, 60);
//   doc.text(`Grade: ${employee.grade}`, 20, 70);

//   // Create table data
//   const tableColumn = ["Type", "Start Date", "End Date", "Duration", "Status"];
//   const tableRows = leaveRequests.map(leave => [
//     getLeaveTypeName(leave.leaveType),
//     formatDate(leave.startDate),
//     formatDate(leave.endDate),
//     `${leave.duration} days`,
//     leave.status
//   ]);

//   // Add table
//   // @ts-ignore
//   doc.autoTable({
//     head: [tableColumn],
//     body: tableRows,
//     startY: 80,
//     theme: 'grid',
//     styles: { fontSize: 10 },
//     headStyles: { fillColor: [41, 128, 185] }
//   });

//   return doc;
// };
