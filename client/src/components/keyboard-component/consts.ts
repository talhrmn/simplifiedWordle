import styles from "./styles.module.css";

export const DELETE_UNICODE: string = "\u232B";

export const SPECIAL_KEYS: Record<string, string> = {"ENTER": styles.enterBtn, "DELETE": styles.deleteBtn};

export const KEYBOARD_KEYS: string[][] = [
	["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
	["A", "S", "D", "F", "G", "H", "J", "K", "L"],
	["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
];
