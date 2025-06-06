import type { ActionMappingType } from "./ActionListener";

class MyActionListener {
    actionMapping: ActionMappingType;

    /** Init the class */
    constructor() {
        this.actionMapping = {};
    }

    /**
     * registerListener registers a function to an action name. 
     * In case the action already exists, the new listener should be added to the already existing listeners.
     * @param action Action name
     * @param listener Function to invoke upon action call
     */
    registerListener(action: string, listener: (arg?: string) => void) {
        if (!this.actionMapping[action]) this.actionMapping[action] = [];
        this.actionMapping[action].push(listener);
    }

    /**
     * When calling the removeListener all listeners are removed from the action, and the action itself is removed and can no longer be called.
     * @param action Action to remove
     */
    removeListener(action: string) {
        delete this.actionMapping[action];
    }

    /**
     * Invoke all registered listeners of the giving action with the passed data.
     * In case the action is not registered, an exception will be thrown
     * @param action The action name
     * @param data The data to pass to all registered listeners as parameter
     */
    emit(action: string, data?: string) {
        const actionList = this.actionMapping[action];
        if (!actionList) throw new Error(`Can't emit an event. Event "${action}" doesn't exits.`);
        actionList.forEach((actionFunction) => actionFunction(data));
    }
};

export default MyActionListener;
