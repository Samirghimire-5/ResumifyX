import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 20, fontFamily: "Helvetica" },
  section: { marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#ddd", paddingBottom: 5 },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  text: { fontSize: 12, marginBottom: 3 },
  bulletPoint: { flexDirection: "row", alignItems: "flex-start" },
  bullet: { width: 10 },
  image: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
});

const DefaultTemplatePDF = ({ resume, imageUrl }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Personal Info */}
      {resume.personalInfo && (
        <View style={styles.section}>
          {imageUrl && <Image src={imageUrl} style={styles.image} />}
          <Text style={styles.heading}>{resume.personalInfo.fullName}</Text>
          <Text style={styles.text}>{resume.personalInfo.jobTitle}</Text>
          {resume.personalInfo.email && <Text style={styles.text}>{resume.personalInfo.email}</Text>}
          {resume.personalInfo.phone && <Text style={styles.text}>{resume.personalInfo.phone}</Text>}
          {resume.personalInfo.address && <Text style={styles.text}>{resume.personalInfo.address}</Text>}
        </View>
      )}

      {/* Summary */}
      {resume.summary && (
        <View style={styles.section}>
          <Text style={styles.heading}>Summary</Text>
          <Text style={styles.text}>{resume.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Experience</Text>
          {resume.experience.map((exp, index) => (
            <View key={index}>
              <Text style={styles.text}>{exp.role} - {exp.companyName}, {exp.location}</Text>
              <Text style={styles.text}>
                {exp.startDate} - {exp.endDate || "Present"}
              </Text>
              {exp.description && exp.description.split("\n").map((desc, i) => (
                <View key={i} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.text}>{desc}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          {resume.education.map((edu, index) => (
            <View key={index}>
              <Text style={styles.text}>{edu.degree} - {edu.school}</Text>
              <Text style={styles.text}>{edu.startDate} - {edu.endDate || "Present"}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
          {resume.skills.map((skill, index) => (
            <View key={index} style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.text}>{skill}</Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default DefaultTemplatePDF;
