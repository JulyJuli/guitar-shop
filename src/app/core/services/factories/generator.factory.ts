import { GeneratorService } from '../generator.service';

export function GeneratorFactory(sequenceLength: number): string {
    return new GeneratorService().generate(sequenceLength);
}
