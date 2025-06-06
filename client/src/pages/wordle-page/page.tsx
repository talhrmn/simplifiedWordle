import { useCallback, useEffect, useMemo, useState } from "react";
import MyActionListener from "../../common/action-listener/types";
import { NUM_OF_BOXES } from "../../components/boxes-component/consts";
import { DICTIONAIRY_URL } from "./consts";
import { DELETE_UNICODE } from "../../components/keyboard-component/consts";
import styles from "./styles.module.css";
import BoxesComponent from "../../components/boxes-component/BoxesComponent";
import KeyboardComponent from "../../components/keyboard-component/KeyboardComponent";

const SimplifiedWordle = () => {
	const actionListener = useMemo(() => new MyActionListener(), []);
	const [word, setWord] = useState<string>("");
	const [wordStatus, setWordStatus] = useState<boolean | null>(null);

	const onEnter = useCallback(() => {
		if (word.length != NUM_OF_BOXES) setWordStatus(false);
		else {
			fetch(`${DICTIONAIRY_URL}/${word}`)
				.then((response) => setWordStatus(response.ok))
				.catch(() => setWordStatus(false));
		}
	}, [word]);

	const onDelete = useCallback(() => {
		setWordStatus(null);
		if (word.length) setWord((prev) => prev.slice(0, -1));
	}, [word]);

	const specialKeysMapping: Record<string, () => void> = {
		ENTER: onEnter,
		DELETE: onDelete,
	};

	const onInput = useCallback(
		(key?: string) => {
			setWordStatus(null);
			if (key && specialKeysMapping[key]) actionListener.emit(key);
			else if (word.length < NUM_OF_BOXES) setWord((prev) => prev + key);
		},
		[word]
	);

	useEffect(() => {
		const actionsMapping: Record<string, (arg?: string) => void> = {
			ENTER: onEnter,
			DELETE: onDelete,
			INPUT: onInput,
		};

		Object.entries(actionsMapping).forEach(([action, listener]) => {
			actionListener.registerListener(action, listener);
		});

		return () => {
			Object.keys(actionsMapping).forEach((action) => {
				actionListener.removeListener(action);
			});
		};
	}, [onEnter, onDelete, onInput, actionListener]);

	return (
		<div className={styles.container}>
			<BoxesComponent word={word} status={wordStatus} />
			<KeyboardComponent
				onClick={(key: string) => actionListener.emit("INPUT", key)}
			/>
		</div>
	);
};

export default SimplifiedWordle;
