export default class CloneUtils {
    /**
     * Try to create a deep clone of the provides object. This handles arrays, collections and maps. If the class in not a supported standard JDK collection type the <code>genericClone</code> will be
     * used instead.
     *
     * @param object
     *          The object to be copied.
     */
    static deepClone<T>(object: T | null): T | null;
    static genericClone<T>(object: T | null): any;
}
