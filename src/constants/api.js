// API Configuration Constants
export const API_BASE_URL = "https://takkinship-backend.up.railway.app/api";

// API Endpoints
export const API_ENDPOINTS = {
  // Project endpoints
  PROJECT: (projectId) => `${API_BASE_URL}/project/${projectId}`,
  PROJECT_WEB_APPS: (projectId) =>
    `${API_BASE_URL}/project/${projectId}/web-applications/`,
  PROJECT_MOBILE_APPS: (projectId) =>
    `${API_BASE_URL}/project/${projectId}/mobile-applications/`,
  PROJECT_DESKTOP_APPS: (projectId) =>
    `${API_BASE_URL}/project/${projectId}/desktop-applications/`,
  PROJECT_TERMS: (projectId) => `${API_BASE_URL}/projects/${projectId}/terms/`,
  PROJECT_POLICY: (projectId) =>
    `${API_BASE_URL}/projects/${projectId}/policy/`,
  PROJECTS: `${API_BASE_URL}/projects/`,

  // Contact endpoints
  CONTACT_US: `${API_BASE_URL}/contact-us/`,
  CONTACT_COMPANY_INFO: `${API_BASE_URL}/contact-company-info/`,

  // FAQ endpoints
  FAQ: `${API_BASE_URL}/faqs/`,

  // Team endpoints
  TEAM_MEMBERS: `${API_BASE_URL}/team-members/`,

  // Work experience endpoints
  WORK_EXPERIENCE: `${API_BASE_URL}/work-experience/`,

  // Testimonials endpoints
  TESTIMONIALS: `${API_BASE_URL}/testimonials/`,

  // Gallery endpoints
  GALLERY: `${API_BASE_URL}/gallery/`,
};

// Export individual endpoint builders for convenience
export const getProjectEndpoint = (projectId) =>
  API_ENDPOINTS.PROJECT(projectId);
export const getProjectWebAppsEndpoint = (projectId) =>
  API_ENDPOINTS.PROJECT_WEB_APPS(projectId);
export const getProjectMobileAppsEndpoint = (projectId) =>
  API_ENDPOINTS.PROJECT_MOBILE_APPS(projectId);
export const getProjectDesktopAppsEndpoint = (projectId) =>
  API_ENDPOINTS.PROJECT_DESKTOP_APPS(projectId);
export const getProjectTermsEndpoint = (projectId) =>
  API_ENDPOINTS.PROJECT_TERMS(projectId);
export const getProjectPolicyEndpoint = (projectId) =>
  API_ENDPOINTS.PROJECT_POLICY(projectId);
