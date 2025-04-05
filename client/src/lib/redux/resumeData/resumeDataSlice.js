import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    personalInfo: {
        image: "",
        name: "",
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
        setImage: (state, action) => {
            state.personalInfo.image = action.payload;
        },
        setPersonalInfo: (state, action) => {
            state.personalInfo = { ...state.personalInfo, ...action.payload };
        },
        setSummary: (state, action) => {
            state.summary = action.payload;
        },
        addExperience: (state, action) => {
            state.experience.push(action.payload);
        },
        delExperience: (state, action) => {
            state.experience.splice(action.payload, 1);
        },
        updateExperience: (state, action) => {
            const { data, index } = action.payload;
            if (state.experience[index]) {
                state.experience[index] = { ...state.experience[index], ...data };
            }
        },
        addEducation: (state, action) => {
            state.education.push(action.payload);
        },
        delEducation: (state, action) => {
            state.education.splice(action.payload, 1);
        },
        updateEducation: (state, action) => {
            const { data, index } = action.payload;
            if (state.education[index]) {
                state.education[index] = { ...state.education[index], ...data };
            }
        },
        addProject: (state, action) => {
            state.projects.push(action.payload);
        },
        delProject: (state, action) => {
            state.projects.splice(action.payload, 1);
        },
        updateProject: (state, action) => {
            const { data, index } = action.payload;
            if (state.projects[index]) {
                state.projects[index] = { ...state.projects[index], ...data };
            }
        },
        setSkills: (state, action) => {
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