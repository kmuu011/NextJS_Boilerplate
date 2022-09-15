import type {NextPage} from 'next';

import * as styles from "../../styles/member/MyPage.style";
import {BaseSyntheticEvent, FormEventHandler, useEffect, useState} from "react";
import SetHead from "../../src/component/common/Head";
import {tokenCheck} from "../../src/api/member";
import {MemberInfoDto} from "../../src/type/member";
import ProfileImageModifyModal from "../../src/component/member/myPage/modal/profileImageModify";
import {useRecoilState} from "recoil";
import {showProfileImageModal} from "../../src/recoil/atoms/member";
import Image, {StaticImageData} from "next/image";
import noImage from "../../public/violet.png";
import {hostDomain} from "../../src/config";
import {awaitExpression} from "@babel/types";

const rules = {
    id: /^[0-9a-zA-Z]*$/i,
    nickname: /^[0-9a-zA-Z가-힣]*$/i,
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
}

const MyPage: NextPage = () => {
    const [memberInfo, setMemberInfo] = useState<MemberInfoDto>();
    const [showProfileModal, setShowProfileModal] = useRecoilState(showProfileImageModal);
    const [imageSrc, setImageSrc] = useState<string | StaticImageData>(noImage);

    useEffect(() => {
        getMemberInfo();
    }, [])

    const getMemberInfo = async (): Promise<void> => {
        const response = await tokenCheck();

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setMemberInfo(response.data);

        if (response.data.profileImgKey) {
            setImageSrc(hostDomain + response.data.profileImgKey);
            return;
        }

        setImageSrc(noImage);
    }

    return (
        <div className={styles.container}>
            <SetHead/>
            <ProfileImageModifyModal
                reloadMemberInfo={getMemberInfo}
                profileImageKey={memberInfo?.profileImgKey}
            />

            <div className={styles.title}>
                마이페이지
            </div>

            <div className={styles.myPageWrap}>
                <div className={styles.profileImgWrap}>
                    <div className={styles.profileImgBorder} onClick={() => setShowProfileModal(true)}>
                        <Image
                            src={imageSrc}
                            width={180}
                            height={180}
                            alt="프로필 사진"
                        />
                    </div>
                </div>

                <div className={styles.profileInfoWrap}>
                    <div className={styles.profileInfo}>
                        <div className={styles.profileInfoDesc}>
                            아이디
                        </div>
                        <div className={styles.profileInfoValue}>
                            {memberInfo?.id || ''}
                        </div>
                    </div>
                    <div className={styles.profileInfo}>
                        <div className={styles.profileInfoDesc}>
                            닉네임
                        </div>
                        <div className={styles.profileInfoValue}>
                            {memberInfo?.nickname || ''}
                        </div>
                    </div>
                    <div className={styles.profileInfo}>
                        <div className={styles.profileInfoDesc}>
                            이메일
                        </div>
                        <div className={styles.profileInfoValue}>
                            {memberInfo?.email || ''}
                        </div>
                    </div>
                </div>

                <div className={styles.buttonWrap}>
                    <button>수정하기</button>
                </div>
            </div>

        </div>
    )
}

export default MyPage
