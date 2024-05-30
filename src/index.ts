/*===================================================================
=        Custom Components MJB                                        =
====================================================================*/
/**
 * All custom styled components for MJB
 */
import TextInputMJB from "./components/atoms/TextInput/TextInput";
import TitleMJB from "./components/atoms/Title/Title";
import ButtonMJB from "./components/atoms/Button/Button";
import CardRowMJB from './components/molecules/CardRow/CardRow';
import DrawerContainerCardRowMJB from './components/molecules/DrawerContainerCardRow/DrawerContainerCardRow'
import ElevatedFixedButtonMJB from './components/molecules/ElevatedFixedButton/ElevatedFixedButton';
import DatePickerMJB from "./components/atoms/DatePicker/DatePicker";
import ThemeProviderMJB, { ThemeContextMJB } from "./ThemeProvider/ThemeProvider";
import TextInputPasswordMJB from "./components/atoms/TextInputPassword/TextInputPassword"
import HorizontalSelectorInputMJB from "./components/atoms/HorizontalSelectorInput/HorizontalSelectorInput"
import NumberPickerMJB from "./components/atoms/NumberPicker/NumberPicker"
import BigModalDrawerMJB from "./components/molecules/BigModalDrawer/BigModalDrawer";

import TextBoxMJB from "./components/molecules/TextBox/TextBox";

import  FileUploaderInputMJB  from "./components/molecules/FileUploaderInput/FileUploaderInput";
import ModalwithBackgroundMJB from "./components/molecules/ModalwithBackground/ModalwithBackground"
import useInfoModalV2 from "./components/organism/InfoModalV2/context/infoModalV2Context";

import { TextBoxItemPropsMJB, TextBoxPropsMJB } from "./components/molecules/TextBox/TextBox";
import FlatListMJB, { FlatListPropsMJB } from "./components/molecules/FlatListMJB/FlatListMJB";
import MultiButtonMjB, { ButtonItemPropsMJB, MultiButtonPropsMJB } from "./components/atoms/MultiButtion/MultiButton";
import  { PickerDropdownMJB, PickerItemMJB, PickerPropsInputMJB } from "./components/atoms/PickerDropdown/PickerDropdown";
import PaginationMJB, { PaginationPropsMJB } from "./components/molecules/Pagination/Pagination";
import LoaderMJB, { LoaderPropsMJB } from "./components/atoms/Loader/Loader";
/**
 * All customs styled components for MJB
 */
export const ThemeProvider = ThemeProviderMJB 

export const TextInput = TextInputMJB
export const Title = TitleMJB
export const Button = ButtonMJB
export const CardRow = CardRowMJB
export const DrawerContainerCardRow = DrawerContainerCardRowMJB
export const ElevatedFixedButton = ElevatedFixedButtonMJB
export const TextInputPassword = TextInputPasswordMJB
export const HorizontalSelectorInput = HorizontalSelectorInputMJB
export const NumberPicker = NumberPickerMJB
export const DatePicker = DatePickerMJB

export const TextBox = TextBoxMJB

export const FlatList = FlatListMJB

export const BigModalDrawer = BigModalDrawerMJB
export const FilePikerInput = FileUploaderInputMJB
export const ModalwithBackground = ModalwithBackgroundMJB
export const useInfoModal = useInfoModalV2

export const Pagination = PaginationMJB
export type PaginationProps = PaginationPropsMJB

/**
 * Type exports
 */

export type FlatListProps = FlatListPropsMJB
export type ThemeContext = ThemeContextMJB

export type TextBoxItemProps = TextBoxItemPropsMJB 
export type TextBoxProps = TextBoxPropsMJB

// MultiButton
export const MultiButton = MultiButtonMjB
export type MultiButtonProps = MultiButtonPropsMJB
export type ButtonItemProps = ButtonItemPropsMJB

export const PickerDropdown =  PickerDropdownMJB
export type PickerPropsInput = PickerPropsInputMJB
export type PickerItem = PickerItemMJB

//Loader
export type LoaderProps = LoaderPropsMJB
export const Loader = LoaderMJB


