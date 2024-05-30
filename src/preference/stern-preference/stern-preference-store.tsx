import { Common } from "@k8slens/extensions";
import { observable, makeObservable } from "mobx";

export type MultiPodLogsSternPreferenceModel = {
  krew: boolean;
  timestamp: string;
  since: string;
  maxLogRequests: number;
  builtInTemplate: string;
  customTemplate: string;
};

export class MultiPodLogsSternPreferencesStore extends Common.Store
  .ExtensionStore<MultiPodLogsSternPreferenceModel> {
  // Store properties
  @observable krew = false;
  @observable timestamp = "no";
  @observable since = "1s";
  @observable maxLogRequests = 50;
  @observable builtInTemplate = "";
  @observable customTemplate = "";

  constructor() {
    super({
      // Store name
      configName: "stern-preference-store",
      // Store default property values
      defaults: {
        krew: false,
        timestamp: "no",
        since: "1s",
        maxLogRequests: 50,
        builtInTemplate: "default",
        customTemplate: "",
      },
    });
    makeObservable(this);
  }

  protected fromStore({
    krew,
    timestamp,
    since,
    maxLogRequests,
    builtInTemplate,
    customTemplate,
  }: MultiPodLogsSternPreferenceModel): void {
    this.krew = krew;
    this.timestamp = timestamp;
    this.since = since;
    this.maxLogRequests = maxLogRequests;
    this.builtInTemplate = builtInTemplate;
    this.customTemplate = customTemplate;
  }

  toJSON(): MultiPodLogsSternPreferenceModel {
    return {
      krew: this.krew,
      timestamp: this.timestamp,
      since: this.since,
      maxLogRequests: this.maxLogRequests,
      builtInTemplate: this.builtInTemplate,
      customTemplate: this.customTemplate,
    };
  }
}

export const sternPreferenceStore = new MultiPodLogsSternPreferencesStore();
