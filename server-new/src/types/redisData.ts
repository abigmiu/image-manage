export interface ISectionLock {
    /** 用户ID */
    userId: number;
    /** 创建的时间戳 */
    timestamp: number;
    /** 最新一节的 id */
    lastSectionId: number;
}