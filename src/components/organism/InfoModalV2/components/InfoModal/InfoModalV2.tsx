/*===================================================================
=       Info Modale Container          =
====================================================================*/
/**
 * 
 */

import React, { FC } from 'react'
import InfoModalView from '../InfoModalView/InfoModalView'

import ModalwithBackground from '../../../../molecules/ModalwithBackground/ModalwithBackground'
import { iconType, useInfoModalV2 } from '../../context/infoModalV2Context'



/*============ TYPES =================*/
export interface InfoModalViewProps {
  title?: string | null,
  contentText?: string | null,
  handleClose?: () => void,
  buttonLabel?: string | null,
  iconType?: iconType
  noCloseButton?: boolean,
  progressBarvalue?: number | undefined,
  loaderMode?: boolean
}


/**
 * 
 * @param InfoModalView 
 * @returns 
 */
const withInfoModalData = (InfoModalView: FC<InfoModalViewProps>) => {

  return function Container () {

    const {closeModal, configData, isShow, setIsShow } = useInfoModalV2()

    return (
      <>
        <ModalwithBackground
          animationType="slide"
          transparent={true}
          visible={isShow}
          onRequestClose={() => {
            setIsShow(false);
          }}
        >
          <InfoModalView 
            handleClose={closeModal}
            title={configData?.title}
            contentText={configData?.message}
            buttonLabel={configData?.labelBtn}
            iconType={configData?.iconType}
            noCloseButton={configData?.noBtnClose || false}
            progressBarvalue={configData?.progressBarvalue}
            loaderMode={configData?.loaderMode || false}
          />
        </ModalwithBackground>
      </>
    )
  }
}



export default  withInfoModalData(InfoModalView)