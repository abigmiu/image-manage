import { ClassConstructor, plainToInstance } from "class-transformer";

export function transformResponse<T extends ClassConstructor<unknown>, V>(classTarget: T, target: V) {
    return plainToInstance(classTarget, target, {
        excludeExtraneousValues: true,
        
    })
}