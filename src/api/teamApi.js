import axios from 'axios';

export const fetchPerformances = () => axios.get('/api/performances').then(res => res.data);
export const fetchStages = () => axios.get('/api/stages').then(res => res.data);
export const fetchTeamSchedule = () => axios.get('/api/team/schedule').then(res => res.data); // 各節目有多少人要參加
export const fetchTeamMembers = () => axios.get('/api/team/members').then(res => res.data);
