import Navbar from "../../components/workspace/Navbar";
import style from "../../style/workspace/Main.module.css";
import SurveyCard from "../../components/workspace/SurveyCard";
import DefaultCard from "../../components/workspace/DefaultCard";

import Modal from "../../components/workspace/Modal";
import MoreMenu from "../../components/workspace/MoreMenu";

import { useState } from "react";
import ProfileContainer from "../../components/workspace/ProfileContainer";
import ShareModal from "../../components/workspace/ShareModal";

export default function Main() {
  // 모달
  let [modal, setModal] = useState(false);
  let [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const closeModal = () => {
    setModal(false);
  };

  const openModal = (surveyId) => {
    setSelectedSurveyId(surveyId);
    setModal(true);
  };

  return (
    <div id={style.SectionBody}>
      {/* modal */}
      <ShareModal
        isOpen={modal}
        onClose={closeModal}
        surveyId={selectedSurveyId}
      />
      {/* Navbar */}
      <Navbar></Navbar>
      <div className={style.sectionWrap}>
        {/* section */}
        <div className={style.section}>
          {/* title */}
          <div className={style.inputWrap}>
            <input value="New Workspace" className={style.inputTitle} />
            {/* group box */}
            <div className={style.groupBox}>
              {/* admin Box */}
              <ProfileContainer />

              <MoreMenu />
            </div>
          </div>
          {/* cardContainer */}
          <div className={style.cardContainer}>
            <DefaultCard></DefaultCard>
            <SurveyCard
              info={"🗒️"}
              surveyId={1}
              onOpenModal={openModal}
              onClose={closeModal}
              className={style.cardItem}
            ></SurveyCard>
            <SurveyCard
              info={"🗒️"}
              surveyId={1}
              onOpenModal={openModal}
              onClose={closeModal}
              className={style.cardItem}
            ></SurveyCard>
            <SurveyCard
              info={"📝"}
              surveyId={1}
              onOpenModal={openModal}
              onClose={closeModal}
              className={style.cardItem}
            ></SurveyCard>
            <SurveyCard
              info={"🗒️"}
              surveyId={1}
              onOpenModal={openModal}
              onClose={closeModal}
              className={style.cardItem}
            ></SurveyCard>
            <SurveyCard
              info={"📝"}
              surveyId={1}
              onOpenModal={openModal}
              onClose={closeModal}
              className={style.cardItem}
            ></SurveyCard>
            <SurveyCard
              info={"📝"}
              surveyId={1}
              onOpenModal={openModal}
              onClose={closeModal}
              className={style.cardItem}
            ></SurveyCard>
          </div>
        </div>
      </div>
    </div>
  );
}
