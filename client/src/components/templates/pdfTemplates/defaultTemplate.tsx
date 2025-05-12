import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { MapPin, Phone, Mail } from "lucide-react";

// Define styles using StyleSheet.create
const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: "Helvetica",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 16,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  headerContent: {
    flex: 1,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerInfo: {
    flexDirection: "column",
  },
  fullName: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1f2937",
  },
  jobTitle: {
    fontSize: 14,
    color: "#4b5563",
    fontWeight: "medium",
    marginTop: 4,
  },
  contactInfo: {
    fontSize: 10,
    textAlign: "right",
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    marginTop: 8,
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  experienceRole: {
    fontSize: 14,
    fontWeight: "semibold",
  },
  experienceDate: {
    fontSize: 10,
    color: "#4b5563",
  },
  companyInfo: {
    fontSize: 10,
    fontWeight: "medium",
    color: "#4b5563",
    marginBottom: 4,
  },
  bulletList: {
    marginTop: 8,
    paddingLeft: 4,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bullet: {
    fontSize: 10,
    marginRight: 8,
    color: "#6b7280",
  },
  bulletText: {
    fontSize: 10,
    flex: 1,
  },
  projectItem: {
    marginBottom: 12,
  },
  projectNameStyle: {
    fontSize: 14,
    fontWeight: "semibold",
  },
  educationItem: {
    marginBottom: 12,
  },
  educationDegree: {
    fontSize: 14,
    fontWeight: "semibold",
  },
  schoolName: {
    fontSize: 10,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  skillBadge: {
    fontSize: 10,
    backgroundColor: "#f3f4f6",
    padding: "4 12",
    borderRadius: 4,
    color: "#4b5563",
  },
});

const PdfDefaultTemplate = ({ resume }: any) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header / Personal Info */}
        {resume.personalInfo && (
          <View style={styles.header}>
            {/* Photo on the left side */}
            {resume.personalInfo.image && (
              <Image
                src={resume.personalInfo.image}
                style={styles.profileImage}
              />
            )}
            
            <View style={styles.headerContent}>
              <View style={styles.headerTop}>
                <View style={styles.headerInfo}>
                  <Text style={styles.fullName}>{resume.personalInfo.fullName}</Text>
                  <Text style={styles.jobTitle}>{resume.personalInfo.jobTitle}</Text>
                </View>
                
                <View style={styles.contactInfo}>
                  {/* Email Icon */}
                  {resume.personalInfo.email && (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Mail size={16} color="#4b5563" />
                      <Text style={{ marginLeft: 5 }}>{resume.personalInfo.email}</Text>
                    </View>
                  )}

                  {/* Phone Icon */}
                  {resume.personalInfo.phone && (
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                      <Phone size={16} color="#4b5563" />
                      <Text style={{ marginLeft: 5 }}>{resume.personalInfo.phone}</Text>
                    </View>
                  )}

                  {/* Address Icon */}
                  {resume.personalInfo.address && (
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                      <MapPin size={16} color="#4b5563" />
                      <Text style={{ marginLeft: 5 }}>{resume.personalInfo.address}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Summary */}
        {resume.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summaryText}>{resume.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {resume.experience && resume.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {resume.experience.map((exp: any, index: number) => (
              <View key={`exp-${index}`} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceRole}>{exp.role}</Text>
                  <Text style={styles.experienceDate}>
                    {exp.startDate ? `${exp.startDate} - ${exp.endDate ? exp.endDate : "Present"}`: ""}
                  </Text>
                </View>
                <Text style={styles.companyInfo}>
                  {exp.companyName}{exp.location ? `, ${exp.location}` : ""}
                </Text>
                {exp.description && (
                  <View style={styles.bulletList}>
                    {exp.description.split("\n").map((desc: string, i: number) => (
                      <View key={`exp-bullet-${i}`} style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{desc}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {resume.projects && resume.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {resume.projects.map((project: any, index: number) => (
              <View key={`project-${index}`} style={styles.projectItem}>
                <Text style={styles.projectNameStyle}>{project.projectName}</Text>
                {project.description && (
                  <View style={styles.bulletList}>
                    {project.description.split("\n").map((desc: string, i: number) => (
                      <View key={`project-bullet-${i}`} style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{desc}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resume.education.map((edu: any, index: number) => (
              <View key={`edu-${index}`} style={styles.educationItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  <Text style={styles.experienceDate}>
                    {edu.startDate ? `${edu.startDate} - ${edu.endDate ? edu.endDate : "Present"}`: ""}
                  </Text>
                </View>
                <Text style={styles.schoolName}>{edu.school}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {resume.skills.map((skill: string, index: number) => (
                <Text 
                  key={`skill-${index}`} 
                  style={styles.skillBadge}
                >
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PdfDefaultTemplate;
