import {
  APPS_SCRIPT_URL,
  registrarToqueNFC,
  registrarQuejaPrivada,
  obtenerMetricasAcumuladas,
  subscribeToMetrics,
  MetricasCentrales,
  EventoToqueNFC,
  QuejaPrivada,
} from './telemetry';

export {
  APPS_SCRIPT_URL,
  registrarToqueNFC,
  registrarQuejaPrivada,
  obtenerMetricasAcumuladas,
  subscribeToMetrics,
};

export type { MetricasCentrales, EventoToqueNFC, QuejaPrivada };

export class AnalyticsStore {
  private static instance: AnalyticsStore;

  private constructor() {}

  public static getInstance(): AnalyticsStore {
    if (!AnalyticsStore.instance) {
      AnalyticsStore.instance = new AnalyticsStore();
    }
    return AnalyticsStore.instance;
  }

  public async trackTap(slug: string, table: string): Promise<boolean> {
    return registrarToqueNFC(slug, table);
  }

  public async trackComplaint(data: {
    slug: string;
    table: string;
    stars: number;
    motivo: string;
    comentario: string;
  }): Promise<boolean> {
    return registrarQuejaPrivada(data);
  }

  public async fetchMetrics(force = false): Promise<MetricasCentrales> {
    return obtenerMetricasAcumuladas(force);
  }

  public onMetricsChange(listener: (m: MetricasCentrales) => void): () => void {
    return subscribeToMetrics(listener);
  }
}

export const analyticsStore = AnalyticsStore.getInstance();
