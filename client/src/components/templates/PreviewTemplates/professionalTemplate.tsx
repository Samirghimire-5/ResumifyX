// import React from 'react';
// import { Document, Page, Text as PDFText, View, StyleSheet, Image } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontFamily: 'Helvetica',
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     marginBottom: 30,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginRight: 25,
//     border: '2px solid #333333',
//   },
//   headerText: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   name: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: '#2E8B57', // Forest Green
//   },
//   title: {
//     fontSize: 18,
//     color: '#555555',
//     marginBottom: 8,
//   },
//   contact: {
//     fontSize: 12,
//     color: '#777777',
//     marginBottom: 3,
//   },
//   section: {
//     marginBottom: 25,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     borderBottomWidth: 2,
//     borderBottomColor: '#2E8B57',
//     paddingBottom: 5,
//     color: '#333333',
//   },
//   experienceItem: {
//     marginBottom: 15,
//   },
//   role: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333333',
//     marginBottom: 3,
//   },
//   company: {
//     fontSize: 14,
//     color: '#555555',
//     marginBottom: 3,
//   },
//   dates: {
//     fontSize: 12,
//     color: '#777777',
//     marginBottom: 5,
//   },
//   description: {
//     fontSize: 12,
//     color: '#555555',
//     marginBottom: 5,
//   },
//   bulletPoint: {
//     marginRight: 5,
//   },
//   listItem: {
//     flexDirection: 'row',
//   },
//   skillsList: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//   },
//   skillItem: {
//       backgroundColor: '#E8F5E9',
//       padding: '5 10',
//       borderRadius: 10,
//       marginRight: 5,
//       marginBottom: 5,
//       fontSize: 12,
//       color: '#333333',
//   }
// });

// const Preview
// ProfessionalTemplate = ({ resume, imageUrl }: any) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       {resume.personalInfo && (
//         <View style={styles.header}>
//           {imageUrl && <Image src={imageUrl} style={styles.profileImage} />}
//           <View style={styles.headerText}>
//             <PDFText style={styles.name}>{resume.personalInfo.fullName}</PDFText>
//             <PDFText style={styles.title}>{resume.personalInfo.jobTitle}</PDFText>
//             {resume.personalInfo.email && <PDFText style={styles.contact}>{resume.personalInfo.email}</PDFText>}
//             {resume.personalInfo.phone && <PDFText style={styles.contact}>{resume.personalInfo.phone}</PDFText>}
//             {resume.personalInfo.address && <PDFText style={styles.contact}>{resume.personalInfo.address}</PDFText>}
//           </View>
//         </View>
//       )}

//       {resume.summary && (
//         <View style={styles.section}>
//           <PDFText style={styles.sectionTitle}>Summary</PDFText>
//           <PDFText style={styles.description}>{resume.summary}</PDFText>
//         </View>
//       )}

//       {resume.experience && resume.experience.length > 0 && (
//         <View style={styles.section}>
//           <PDFText style={styles.sectionTitle}>Experience</PDFText>
//           {resume.experience.map((exp, index) => (
//             <View key={index} style={styles.experienceItem}>
//               <PDFText style={styles.role}>{exp.role}</PDFText>
//               <PDFText style={styles.company}>{`${exp.companyName}, ${exp.location}`}</PDFText>
//               <PDFText style={styles.dates}>
//                 {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
//                 {exp.endDate && exp.endDate !== '' && ` - ${new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`}
//                 {(!exp.endDate || exp.endDate === '') && exp.startDate && ' - Present'}
//               </PDFText>
//               <View>
//                 {exp.description && exp.description.split('\n').map((item, descIndex) => (
//                   <View key={descIndex} style={styles.listItem}>
//                     <PDFText style={styles.bulletPoint}>•</PDFText>
//                     <PDFText style={styles.description}>{item}</PDFText>
//                   </View>
//                 ))}
//               </View>
//             </View>
//           ))}
//         </View>
//       )}

//       {resume.education && resume.education.length > 0 && (
//         <View style={styles.section}>
//           <PDFText style={styles.sectionTitle}>Education</PDFText>
//           {resume.education.map((edu, index) => (
//             <View key={index} style={styles.experienceItem}>
//               <PDFText style={styles.role}>{edu.degree}</PDFText>
//               <PDFText style={styles.company}>{edu.school}</PDFText>
//               <PDFText style={styles.dates}>
//                 {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
//                 {edu.endDate && edu.endDate !== '' && ` - ${new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`}
//                 {(!edu.endDate || edu.endDate === '') && edu.startDate && ' - Present'}
//               </PDFText>
//             </View>
//           ))}
//         </View>
//       )}

//       {resume.skills && resume.skills.length > 0 && (
//         <View style={styles.section}>
//           <PDFText style={styles.sectionTitle}>Skills</PDFText>
//           <View style = {styles.skillsList}>
//             {resume.skills.map((skill, index) => (
//               <PDFText key={index} style={styles.skillItem}>{skill}</PDFText>
//             ))}
//           </View>
//         </View>
//       )}
//     </Page>
//   </Document>
// );

// export default Preview
// ProfessionalTemplate;