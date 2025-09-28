import { Routes } from '@angular/router';
import { EmployeeLogin } from './dashboard/employee-login/employee-login';
import { CandidateLogin } from './dashboard/candidate-login/candidate-login';
import { Dashboard } from './dashboard/dashboard';

import { CandidateDashboard } from './candidate-dashboard/candidate-dashboard';
import { CandidateMyapplications } from './candidate-dashboard/candidate-myapplications/candidate-myapplications';
import { CandidateRegistration } from './dashboard/candidate-registration/candidate-registration';
import { Overview } from './candidate-dashboard/overview/overview';
import { FindJobs } from './candidate-dashboard/find-jobs/find-jobs';
import { Interviews } from './candidate-dashboard/interviews/interviews';
import { CandidateEditProfile } from './candidate-dashboard/candidate-edit-profile/candidate-edit-profile';
import { Settings } from './candidate-dashboard/settings/settings';
import { PmDashboard } from './pm-dashboard/pm-dashboard';
import { TeamleadDashboard } from './teamlead-dashboard/teamlead-dashboard';
import { TlOverview } from './teamlead-dashboard/tl-overview/tl-overview';
import { MyProject } from './teamlead-dashboard/my-project/my-project';
import { JobRequest } from './teamlead-dashboard/job-request/job-request';
import { PendingInterviews } from './teamlead-dashboard/pending-interviews/pending-interviews';
import { TeamMembers } from './teamlead-dashboard/team-members/team-members';
import { TlSettings } from './teamlead-dashboard/tl-settings/tl-settings';
//import { CandidateMyapplications } from './candidate-dashboard/candidate-myapplications/candidate-myapplications';
//import { CandidateEditProfile } from './candidate-dashboard/candidate-edit-profile/candidate-edit-profile';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: Dashboard,
    children: [
      { path: 'employee-login', component: EmployeeLogin },
      { path: 'candidate-login', component: CandidateLogin },
      { path: 'candidate-registration', component: CandidateRegistration },
    ]
  },

    { path: 'candidateDashboard', redirectTo: 'candidateDashboard/overview', pathMatch: 'full' },

  {
    path: 'candidateDashboard',
    component: CandidateDashboard,
    children: [
      {
        path: 'overview',
        component: Overview, // Your default dashboard
      },
      {
        path: 'my-applications',
        component: CandidateMyapplications,
      },
      {
        path: 'find-jobs',
        component: FindJobs,
      },
      {
        path: 'interviews',
        component: Interviews,
      },
      {
        path: 'edit-profile',
        component: CandidateEditProfile,
      },
      {
        path: 'settings',
        component: Settings,
      },
    ],
  },


  { path: 'tl-dashbaord', redirectTo: 'tl-dashbaord/overview', pathMatch: 'full' },


  {
    path: 'tl-dashbaord',
    component: TeamleadDashboard,
    children: [
      {
        path: 'overview',
        component: TlOverview, // Your default dashboard
      },
      {
        path: 'my-projects',
        component: MyProject,
      },
      {
        path: 'job-requests',
        component: JobRequest,
      },
      {
        path: 'team-members',
        component: TeamMembers,
      },
      {
        path: 'pending-interviews',
        component: PendingInterviews,
      },
      {
        path: 'settings',
        component: TlSettings,
      },
    ],
  },


  { path: 'tl-dashbaord', component: TeamleadDashboard },



  { path: 'pm-dashbaord', component: PmDashboard },


  { path: '**', redirectTo: 'candidate-login' }

];
