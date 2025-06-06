import type { KeyboardComponentProps } from "./types";
import styles from "./styles.module.css";
import { DELETE_UNICODE, KEYBOARD_KEYS, SPECIAL_KEYS } from "./consts";

const KeyboardComponent = ({ onClick }: KeyboardComponentProps) => {
	const iconMapping: Record<string, string> = {
		DELETE: DELETE_UNICODE,
	};
	return (
		<div className={styles.container}>
			{KEYBOARD_KEYS.map((keyRow, keyRowIdx) => (
				<div className={styles.keyRow} key={keyRowIdx}>
					{keyRow.map((key) => (
						<button
							className={`${styles.keyButton} ${
								key in SPECIAL_KEYS ? SPECIAL_KEYS[key] : ""
							}`}
							key={key}
							onClick={() => onClick(key)}
						>
							{key in iconMapping ? iconMapping[key] : key}
						</button>
					))}
				</div>
			))}
		</div>
	);
};

export default KeyboardComponent;
