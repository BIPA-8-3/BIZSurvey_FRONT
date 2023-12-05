import { lazy } from "react";
import { Navigate } from "react-router-dom";
import SurveyInfoPage from "../pages/survey/SurveyInfoPage";

import SurveyResultPage from "../pages/survey/SurveyResultPage";


const FullLayout = lazy(() => import("../pages/Layout"));


const SurveyPostContainer = lazy(() =>
  import("../components/common/SurveyPostContainer")
);
const Login = lazy(() => import("../components/user/Login"));
const Join = lazy(() => import("../components/user/Join"));
const Plan = lazy(() => import("../components/common/Plan"))
const CommunityPost = lazy(() => import('../components/community/CommunityPost'))
const CommunityDetail = lazy(() => import('../components/community/CommunityDetail'))
const CommunityWrite = lazy(() => import('../components/community/CommunityWrite'))
const SurveyCommunityDetail = lazy(() => import('../components/surveyCommunity/SurveyCommunityDetail'))
const CommunitySurveyWrite = lazy(() => import('../components/surveyCommunity/CommunitySurveyWrite'))
const FindPassword = lazy(() => import('../components/user/FindPassword'))
const Mypage = lazy(() => import('../components/user/Mypage'))
const CreateSurvey = lazy(() => import("../pages/survey/CreateSurveyPage"));
const SurveyInfo = lazy(() => import("../pages/survey/SurveyInfoPage"));
const SurveyTest = lazy(() => import("../pages/survey/SurveyResultPage"));
const PostDetail = lazy(() => import("../components/community/PostDetail"));
const SurveyCommunityWrite = lazy(() => import('../components/surveyCommunity/SurveyCommunityWrite'))

const Main = lazy(() => import("../pages/workspace/Main"));

const ThemeRoutes = [
    {
        path : "/",
        element: <FullLayout />,
        children: [
            {path: "/", exact: true, element: <SurveyPostContainer />},
            {path: "/surveyPost", exact: true, element: <SurveyPostContainer />},
            {path: "/login", exact: true, element: <Login />},
            {path: "/join", exact: true, element: <Join />},
            {path: "/plan", exact: true, element: <Plan />},
            {path: "/community", exact: true, element: <CommunityPost />},
            {path: "/communityDetail", exact: true, element: <CommunityDetail />},
            {path: "/communityWrite", exact: true, element: <CommunityWrite />},
            {path: "/surveyCommunityDetail", exact: true, element: <SurveyCommunityDetail />},
            {path: "/communitySurveyWrite", exact: true, element: <CommunitySurveyWrite />},
            {path: "/FindPassword", exact: true, element: <FindPassword />},
            {path: "/mypage", exact: true, element: <Mypage />},
            {path: "/createSurvey", exact: true, element: <CreateSurvey /> },
            {path: "/surveyInfo", exact: true, element: <SurveyInfoPage /> },
            {path: "/surveyCommunityWrite", exact: true, element: <SurveyCommunityWrite /> },
            {path: "/workspace", exact: true, element: <Main /> },
    ],
  },
];

export default ThemeRoutes;
