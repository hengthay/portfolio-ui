import { configureStore } from "@reduxjs/toolkit";
import profileReducer from '../features/profiles/profileSlice';
import portfolioReducer from '../features/portfolios/portfolioSlice';
import resumeReducer from '../features/resumes/resumeSlice';
import blogReducer from '../features/blogs/blogSlice';
import skillReducer from '../features/skills/skillSlice';
import certificateReducer from '../features/certificates/certificateSlice';
import experienceReducer from '../features/experiences/experienceSlice';

const store = configureStore({
  reducer: {
    profiles: profileReducer,
    portfolios: portfolioReducer,
    resumes: resumeReducer,
    blogs: blogReducer,
    skills: skillReducer,
    certificates: certificateReducer,
    experiences: experienceReducer
  }
})

export default store;