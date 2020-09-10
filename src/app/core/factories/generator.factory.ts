import { InjectionToken } from '@angular/core';

import { GeneratorService } from '../services/generator.service';

export const GeneratorServiceAlias = new InjectionToken<GeneratorService>('GeneratorServiceAlias');

export function GeneratorFactory(sequenceLength: number) {
    return (data: GeneratorService): string => data.generate(sequenceLength);
}
