import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Personal  {
    image: string;
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
}

interface Experience {
    role: string;
    companyName: string;
    startDate: Date |  string;
    endDate: Date | string;
    description: string;
}

interface Education {
    degree: string;
    school: string;
    startDate: Date | string;
    endDate: Date | string;
}

interface Project {
    projectName: string;
    description: string;
}

interface ResumeDataState {
    personalInfo: Personal;
    summary: string;
    experience: Experience[];
    education: Education[];
    projects: Project[];
    skills: string[];
}

const initialState: ResumeDataState = {
    personalInfo: {
        image: "",
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        address: "",
    },
    summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
};

const resumeDataSlice = createSlice({
    name: "resumeData",
    initialState,
    reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      state.personalInfo.image = action.payload;
    },
    setPersonalInfo: (state, action: PayloadAction<Partial<Personal>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    setSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload;
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experience.push(action.payload);
    },
    delExperience: (state, action: PayloadAction<number>) => {
      state.experience.splice(action.payload, 1);
    },
    updateExperience: (
      state,
      action: PayloadAction<{ data: Partial<Experience>; index: number }>
    ) => {
      const { data, index } = action.payload;
      if (state.experience[index]) {
        state.experience[index] = { ...state.experience[index], ...data };
      }
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.education.push(action.payload);
    },
    delEducation: (state, action: PayloadAction<number>) => {
      state.education.splice(action.payload, 1);
    },
    updateEducation: (
      state,
      action: PayloadAction<{ data: Partial<Education>; index: number }>
    ) => {
      const { data, index } = action.payload;
      if (state.education[index]) {
        state.education[index] = { ...state.education[index], ...data };
      }
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    delProject: (state, action: PayloadAction<number>) => {
      state.projects.splice(action.payload, 1);
    },
    updateProject: (
      state,
      action: PayloadAction<{ data: Partial<Project>; index: number }>
    ) => {
      const { data, index } = action.payload;
      if (state.projects[index]) {
        state.projects[index] = { ...state.projects[index], ...data };
      }
    },
    setSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    resetResumeData: () => initialState,
  },
});

export const {
    setImage,
    setPersonalInfo,
    setSummary,
    addExperience,
    setSkills,
    delExperience,
    updateExperience,
    addEducation,
    delEducation,
    updateEducation,
    addProject,
    delProject,
    updateProject,
    resetResumeData,
} = resumeDataSlice.actions;

export default resumeDataSlice.reducer;