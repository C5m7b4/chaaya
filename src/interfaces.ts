export interface CurrIt {
  expects?: any;
  name?: string;
}

export interface CurrDesProps {
  it: CurrIt[];
  warnings: string[];
  skippedOnlies: string[];
  beforeAll: string[];
  skippedIts: string[];
  name?: string;
}

export interface CurrentStat {
  name: string;
  it: any;
  skippedIts: any[];
  warnings: string[];
  skippedOnlies: any;
}

export interface Options {
  watch: boolean;
}

export interface iDescribe {
  (this: any, desc: string, fn: any): void;
  skip?: (desc: string, fn: any) => void;
  only?: (desc: string, fn: any) => void;
}

export interface iIt {
  (this: any, desc: string, fn: any): void;
  skip?: (desc: string, fn: any) => void;
}

export interface iExpect {
  (value: any): void;
}

export interface iBeforeEach {
  (fn: any): void;
}

export interface iAfterEach {
  (fn: any): void;
}

export interface iBeforeAll {
  (fn: any): void;
}

export interface iAfterAll {
  (fn: any): void;
}

export interface iSetDryRun {
  (value: boolean): void;
}
