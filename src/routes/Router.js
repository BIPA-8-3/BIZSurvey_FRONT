import { lazy } from "react";
import { Navigate } from "react-router-dom";
import SurveyInfoPage from "../pages/survey/SurveyInfoPage";
import SurveyResultPage from "../pages/survey/SurveyResultPage";
import EditSurveyPage from "../pages/survey/EditSurveyPage";
import SharedSurvey from "../pages/workspace/SharedSurvey";

const FullLayout = lazy(() => import("../pages/Layout"));

const SurveyPostContainer = lazy(() =>
  import("../components/common/SurveyPostContainer")
);
const Login = lazy(() => import("../components/user/Login"));
const Join = lazy(() => import("../components/user/Join"));
const Plan = lazy(() => import("../components/common/Plan"));
const CommunityPost = lazy(() =>
  import("../components/community/CommunityPost")
);
const CommunityDetail = lazy(() =>
  import("../components/community/CommunityDetail")
);
const CommunityWrite = lazy(() =>
  import("../components/community/CommunityWrite")
);
const SurveyCommunityDetail = lazy(() =>
  import("../components/surveyCommunity/SurveyCommunityDetail")
);
const CommunitySurveyWrite = lazy(() =>
  import("../components/surveyCommunity/CommunitySurveyWrite")
);
const FindPassword = lazy(() => import("../components/user/FindPassword"));
const Mypage = lazy(() => import("../components/user/Mypage"));
const CreateSurvey = lazy(() => import("../pages/survey/CreateSurveyPage"));
const SurveyInfo = lazy(() => import("../pages/survey/SurveyInfoPage"));
const EditSurvey = lazy(() => import("../pages/survey/EditSurveyPage"));
const CreateScoreSurvey = lazy(() =>
  import("../pages/survey/CreateScoreSurveyPage")
);
const EditScoreSurvey = lazy(() =>
  import("../pages/survey/EditScoreSurveyPage")
);
const PostDetail = lazy(() => import("../components/community/PostDetail"));
const SurveyCommunityWrite = lazy(() =>
  import("../components/surveyCommunity/SurveyCommunityWrite")
);
const OAuth2RedirectHandler = lazy(() =>
  import("../components/common/OAuth2RedirectHandler")
);
const EmailValidation = lazy(() =>
  import("../components/user/EmailValidation")
);
const ChangPassword = lazy(() => import("../components/user/ChangePassword"));
const AdditionalJoin = lazy(() => import("../components/user/AdditionalJoin"));
const CommunitySearchResult = lazy(() =>
  import("../components/common/SearchResultTable")
);
const SCommunitySearchResult = lazy(() =>
  import("../components/common/SCommunitySearchResult")
);

const MypageSurveyCommunity = lazy(() =>
  import("../components/user/MypageSurveyCommunity")
);
const MypageCommunity = lazy(() =>
  import("../components/user/MypageCommunity")
);
const MypagePassword = lazy(() => import("../components/user/MypagePassword"));
const MypagePlan = lazy(() => import("../components/user/MypagePlan"));
const AdminUserList = lazy(() => import("../pages/admin/AdminUserListPage"));
const AdminUserInfo = lazy(() => import("../pages/admin/AdminUserInfoPage"));
const AdminSurveyList = lazy(() =>
  import("../pages/admin/AdminSurveyListPage")
);
const AdminCommunityListPage = lazy(() =>
  import("../pages/admin/AdminCommunityListPage")
);
const AdminMainPage = lazy(() => import("../pages/admin/AdminMainPage"));
const AdminClaimListPage = lazy(() =>
  import("../pages/admin/AdminClaimListPage")
);
const AdminLoginPage = lazy(() => import("../pages/admin/AdminLoginPage"));

const Main = lazy(() => import("../pages/workspace/Main"));
const Authorization = lazy(() => import("../pages/workspace/Authorization"));

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", exact: true, element: <SurveyPostContainer /> },
      { path: "/surveyPost", exact: true, element: <SurveyPostContainer /> },
      { path: "/login", exact: true, element: <Login /> },
      { path: "/join", exact: true, element: <Join /> },
      { path: "/plan", exact: true, element: <Plan /> },
      { path: "/community", exact: true, element: <CommunityPost /> },
      { path: "/communityDetail", exact: true, element: <CommunityDetail /> },
      { path: "/communityWrite", exact: true, element: <CommunityWrite /> },
      {
        path: "/surveyCommunityDetail",
        exact: true,
        element: <SurveyCommunityDetail />,
      },
      {
        path: "/communitySurveyWrite",
        exact: true,
        element: <CommunitySurveyWrite />,
      },
      { path: "/FindPassword", exact: true, element: <FindPassword /> },
      { path: "/mypage", exact: true, element: <Mypage /> },
      { path: "/createSurvey", exact: true, element: <CreateSurvey /> },
      { path: "/surveyInfo", exact: true, element: <SurveyInfo /> },
      { path: "/editSurvey", exact: true, element: <EditSurvey /> },
      {
        path: "/createScoreSurvey",
        exact: true,
        element: <CreateScoreSurvey />,
      },
      {
        path: "/editScoreSurvey",
        exact: true,
        element: <EditScoreSurvey />,
      },
      {
        path: "/surveyCommunityWrite",
        exact: true,
        element: <SurveyCommunityWrite />,
      },
      { path: "/workspace", exact: true, element: <Main /> },

      {
        path: "/login/oauth2/kakao",
        exact: true,
        element: <OAuth2RedirectHandler />,
      },
      {
        path: "/emailValidation/:key",
        exact: true,
        element: <EmailValidation />,
      },
      { path: "/changePassword", exact: true, element: <ChangPassword /> },
      { path: "/additionalJoin", exact: true, element: <AdditionalJoin /> },
      {
        path: "/mypageSurveyCommunity",
        exact: true,
        element: <MypageSurveyCommunity />,
      },
      { path: "/mypageCommunity", exact: true, element: <MypageCommunity /> },
      { path: "/mypagePassword", exact: true, element: <MypagePassword /> },
      { path: "/mypagePlan", exact: true, element: <MypagePlan /> },
      { path: "/admin/userList", exact: true, element: <AdminUserList /> },
      { path: "/admin/userInfo", exact: true, element: <AdminUserInfo /> },
      { path: "/admin/surveyList", exact: true, element: <AdminSurveyList /> },
      {
        path: "/admin/communityList",
        exact: true,
        element: <AdminCommunityListPage />,
      },
      { path: "/admin/main", exact: true, element: <AdminMainPage /> },
      {
        path: "/admin/claimList",
        exact: true,
        element: <AdminClaimListPage />,
      },
      {
        path: "/communitySearchResult",
        exact: true,
        element: <CommunitySearchResult />,
      },
      {
        path: "/authorization/:type/:token",
        exact: true,
        element: <Authorization />,
      },
      {
        path: "/survey/participate/external",
        exact: true,
        element: <SharedSurvey />,
      },

      {
        path: "/surveyCommunitySearchResult",
        exact: true,
        element: <SCommunitySearchResult />,
      },

      {
        path: "/admin/login",
        exact: true,
        element: <AdminLoginPage />,
      },
    ],
  },
];

export default ThemeRoutes;
