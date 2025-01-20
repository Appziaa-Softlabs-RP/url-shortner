"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CityDistributionChart } from "./city-distribution-chart"
import { DailyVisitsChart } from "./daily-visits-chart"
import { DeviceDistributionChart } from "./device-distribution-chart"
import { TopCountriesChart } from "./top-countries-chart"

export function UrlAnalytics({ urlAnalytics }: any) {

    if (urlAnalytics.totalVisits === 0) {
        return <>
            <div className="container mx-auto p-0 sm:p-4">
                <h3 className="text-2xl font-bold mb-4 text-center text-slate-600">
                    This URL Hasn’t Tracked Any Visits Yet
                </h3>
            </div>
        </>
    }

    return (
        <div className="container mx-auto p-0 sm:p-4">
            <h1 className="text-2xl font-bold mb-4">URL Analytics Dashboard</h1>
            <p className="mb-4">Total Visits: {urlAnalytics.totalVisits}</p>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Daily Visits</CardTitle>
                    </CardHeader>
                    <CardContent className="max-w-full overflow-x-scroll">
                        <DailyVisitsChart data={urlAnalytics.dailyVisits} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Device Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="max-w-full overflow-x-scroll">
                        <DeviceDistributionChart data={urlAnalytics.deviceDistribution} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top 5 Countries</CardTitle>
                    </CardHeader>
                    <CardContent className="max-w-full overflow-x-scroll">
                        <TopCountriesChart data={urlAnalytics.topCountries} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>City Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="max-w-full overflow-x-scroll">
                        <CityDistributionChart data={urlAnalytics.cityDistribution} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
