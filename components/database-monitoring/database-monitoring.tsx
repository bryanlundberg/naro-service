"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import moment from "moment";
import { useOrganization, useUser } from "@clerk/nextjs";

interface TimeSeriesData {
  timestamp: number;
  value: number;
}

interface OperationMetrics {
  reads: number;
  writes: number;
  queries: number;
  traffic: number;
  lastUpdated: number;
}

interface ProjectMetrics {
  operations: OperationMetrics;
  readHistory: TimeSeriesData[];
  writeHistory: TimeSeriesData[];
  queryHistory: TimeSeriesData[];
  trafficHistory: TimeSeriesData[];
}

interface MetricsResponse {
  success: boolean;
  metrics: ProjectMetrics;
}

interface DatabaseMonitoringProps {
  projectId: string;
}

export default function DatabaseMonitoring({ projectId }: DatabaseMonitoringProps) {
  const { user } = useUser();
  const { organization } = useOrganization();
  const orgId = organization ? organization.id : user?.id;

  const { data, error, isLoading } = useSWR<MetricsResponse>(
    `/api/v1/metrics/${projectId}`,
    fetcher,
    { refreshInterval: 5000 }
  );

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTimestamp = (timestamp: number) => {
    return moment(timestamp).format('HH:mm:ss');
  };

  const prepareChartData = (history: TimeSeriesData[]) => {
    return history.map(item => ({
      time: formatTimestamp(item.timestamp),
      value: item.value
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !data || !data.success) {
    return (
      <div className="text-red-500 p-4">
        Error loading metrics data. Please try again later.
      </div>
    );
  }

  const { metrics } = data;
  const readData = prepareChartData(metrics.readHistory);
  const writeData = prepareChartData(metrics.writeHistory);
  const queryData = prepareChartData(metrics.queryHistory);
  const trafficData = prepareChartData(metrics.trafficHistory);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Database Monitoring</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.operations.reads}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Writes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.operations.writes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.operations.queries}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(metrics.operations.traffic)}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reads">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reads">Reads</TabsTrigger>
          <TabsTrigger value="writes">Writes</TabsTrigger>
          <TabsTrigger value="queries">Queries</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
        </TabsList>

        <TabsContent value="reads">
          <Card>
            <CardHeader>
              <CardTitle>Read Operations</CardTitle>
              <CardDescription>Number of read operations over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={readData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="writes">
          <Card>
            <CardHeader>
              <CardTitle>Write Operations</CardTitle>
              <CardDescription>Number of write operations over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={writeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queries">
          <Card>
            <CardHeader>
              <CardTitle>Query Operations</CardTitle>
              <CardDescription>Number of query operations over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={queryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#ffc658" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic">
          <Card>
            <CardHeader>
              <CardTitle>Traffic</CardTitle>
              <CardDescription>Data traffic over time (bytes)</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#ff8042" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-xs text-gray-500">
        Last updated: {moment(metrics.operations.lastUpdated).format('YYYY-MM-DD HH:mm:ss')}
      </div>
    </div>
  );
}
