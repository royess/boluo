import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons/faDiceD20';
import { faTheaterMasks } from '@fortawesome/free-solid-svg-icons/faTheaterMasks';
import { faRunning } from '@fortawesome/free-solid-svg-icons/faRunning';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons/faCaretSquareDown';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons/faSatelliteDish';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons/faUserEdit';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons/faLevelDownAlt';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faFileImage } from '@fortawesome/free-solid-svg-icons/faFileImage';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faBookReader } from '@fortawesome/free-solid-svg-icons/faBookReader';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';

export interface IconProps {
  className?: string;
  size?: SizeProp;
}

export const UploadIcon = (props: IconProps) => <FontAwesomeIcon icon={faUpload} {...props} />;
export const SpinnerIcon = (props: IconProps) => <FontAwesomeIcon icon={faSpinner} {...props} />;
export const D20Icon = (props: IconProps) => <FontAwesomeIcon icon={faDiceD20} {...props} />;
export const CharacterIcon = (props: IconProps) => <FontAwesomeIcon icon={faTheaterMasks} {...props} />;
export const BroadcastIcon = (props: IconProps) => <FontAwesomeIcon icon={faSatelliteDish} {...props} />;
export const ActionIcon = (props: IconProps) => <FontAwesomeIcon icon={faRunning} {...props} />;
export const SendIcon = (props: IconProps) => <FontAwesomeIcon icon={faPaperPlane} {...props} />;
export const HistoryIcon = (props: IconProps) => <FontAwesomeIcon icon={faHistory} {...props} />;
export const InfoIcon = (props: IconProps) => <FontAwesomeIcon icon={faInfo} {...props} />;
export const SuccessIcon = (props: IconProps) => <FontAwesomeIcon icon={faCheckCircle} {...props} />;
export const WarningIcon = (props: IconProps) => <FontAwesomeIcon icon={faExclamationTriangle} {...props} />;
export const CancelIcon = (props: IconProps) => <FontAwesomeIcon icon={faTimes} {...props} />;
export const BarsIcon = (props: IconProps) => <FontAwesomeIcon icon={faBars} {...props} />;
export const EllipsisIcon = (props: IconProps) => <FontAwesomeIcon icon={faEllipsisV} {...props} />;
export const CaretSquareDownIcon = (props: IconProps) => <FontAwesomeIcon icon={faCaretSquareDown} {...props} />;
export const CaretDownIcon = (props: IconProps) => <FontAwesomeIcon icon={faCaretDown} {...props} />;
export const CaretRightIcon = (props: IconProps) => <FontAwesomeIcon icon={faCaretRight} {...props} />;
export const PlusIcon = (props: IconProps) => <FontAwesomeIcon icon={faPlus} {...props} />;
export const PlusSquareIcon = (props: IconProps) => <FontAwesomeIcon icon={faPlusSquare} {...props} />;
export const LoginIcon = (props: IconProps) => <FontAwesomeIcon icon={faSignInAlt} {...props} />;
export const SignOutIcon = (props: IconProps) => <FontAwesomeIcon icon={faSignOutAlt} {...props} />;
export const DownIcon = (props: IconProps) => <FontAwesomeIcon icon={faAngleDown} {...props} />;
export const RightIcon = (props: IconProps) => <FontAwesomeIcon icon={faAngleRight} {...props} />;
export const UserIcon = (props: IconProps) => <FontAwesomeIcon icon={faUserCircle} {...props} />;
export const UserEditIcon = (props: IconProps) => <FontAwesomeIcon icon={faUserEdit} {...props} />;
export const FoldIcon = (props: IconProps) => <FontAwesomeIcon icon={faEyeSlash} {...props} />;
export const ExpandIcon = (props: IconProps) => <FontAwesomeIcon icon={faExpandAlt} {...props} />;
export const InsertIcon = (props: IconProps) => <FontAwesomeIcon icon={faLevelDownAlt} {...props} />;
export const DeleteIcon = (props: IconProps) => <FontAwesomeIcon icon={faTrash} {...props} />;
export const SearchIcon = (props: IconProps) => <FontAwesomeIcon icon={faSearch} {...props} />;
export const FileImageIcon = (props: IconProps) => <FontAwesomeIcon icon={faFileImage} {...props} />;
export const MemberIcon = (props: IconProps) => <FontAwesomeIcon icon={faUsers} {...props} />;
export const GmIcon = (props: IconProps) => <FontAwesomeIcon icon={faBookReader} {...props} />;
export const AdminIcon = (props: IconProps) => <FontAwesomeIcon icon={faCrown} {...props} />;
export const SettingsIcon = (props: IconProps) => <FontAwesomeIcon icon={faCogs} {...props} />;
