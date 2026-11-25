import { useState } from 'react';
import { FileText, TrendingUp, Download } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Sector
} from 'recharts';
import { useBusinessManager } from '../../contexts/BusinessManagerContext';
import {
  mockFurnitureSalesData,
  mockMarketShareData,
  mockMaterialTrendsData,
  mockExportData
} from '../../utils/mockBusinessData';

export default function IndustryInsightsDashboard() {
  const { industryReports } = useBusinessManager();
  const [activePieIndex, setActivePieIndex] = useState(0);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const RED_COLOR = '#ef4444';
  const GREEN_COLOR = '#10b981';
  
  // Format currency value for tooltips and axes
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `EGP ${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `EGP ${(value / 1000).toFixed(1)}K`;
    } else {
      return `EGP ${value}`;
    }
  };
  
  // Format large numbers for tooltips and axes
  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    } else {
      return value.toString();
    }
  };
  
  // Custom active shape for pie chart
  const renderActiveShape = (props: any) => {
    const { 
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value
    } = props;
    
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm font-medium">
          {payload.category}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">
          {`${(percent * 100).toFixed(2)}%`}
        </text>
      </g>
    );
  };
  
  const handleReportSelection = (reportId: string) => {
    setSelectedReport(reportId === selectedReport ? null : reportId);
  };
  
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Industry Insights</h1>
        <p className="text-gray-600">
          Stay updated with market trends, sales data, and industry forecasts for the furniture sector
        </p>
      </div>
      
      {/* Sales Trends Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Furniture Sales Trends (2025)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={mockFurnitureSalesData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="residential" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
              name="Residential"
            />
            <Line 
              type="monotone" 
              dataKey="commercial" 
              stroke="#82ca9d" 
              name="Commercial" 
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#ff7300" 
              strokeWidth={2} 
              name="Total Sales" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Market Share & Material Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Share */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Furniture Category Market Share</h2>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  activeIndex={activePieIndex}
                  activeShape={renderActiveShape}
                  data={mockMarketShareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                  onMouseEnter={(_, index) => setActivePieIndex(index)}
                >
                  {mockMarketShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Material Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Popular Materials Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={mockMaterialTrendsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="material" width={100} />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="count" 
                name="Usage Count" 
                radius={[0, 4, 4, 0]}
              >
                {mockMaterialTrendsData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.trend === 'rising' ? GREEN_COLOR : entry.trend === 'declining' ? RED_COLOR : '#8884d8'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">Rising</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-sm text-gray-600">Stable</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-600">Declining</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Export Markets */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Top Export Markets (2025)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={mockExportData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="value" name="Export Value" fill="#8884d8" radius={[4, 4, 0, 0]}>
              {mockExportData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.change > 0 ? GREEN_COLOR : RED_COLOR} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center mt-4 gap-4">
          {mockExportData.slice(0, 5).map((country, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${country.change > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">{country.country}</span>
              <span className={`text-xs ${country.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {country.change > 0 ? `+${country.change}%` : `${country.change}%`}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Industry Reports */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Latest Industry Reports</h2>
        <div className="space-y-4">
          {industryReports.map((report) => (
            <div 
              key={report.id}
              className={`border ${
                selectedReport === report.id ? 'border-primary-300 bg-primary-50' : 'border-gray-200'
              } rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer`}
              onClick={() => handleReportSelection(report.id)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FileText 
                    size={20} 
                    className={
                      report.type === 'market' ? 'text-blue-500' :
                      report.type === 'trend' ? 'text-green-500' :
                      report.type === 'forecast' ? 'text-amber-500' :
                      'text-purple-500'
                    } 
                  />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-base font-medium text-gray-900">{report.title}</h3>
                    <span className="text-sm text-gray-500">{report.publicationDate}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{report.source}</p>
                  
                  {selectedReport === report.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-3">{report.summary}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {report.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div>
                        <a 
                          href={report.downloadUrl} 
                          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800"
                        >
                          <Download size={14} className="mr-1" />
                          Download Full Report
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Analyst Notes */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <TrendingUp size={20} className="text-primary-600 mr-2" />
          <h2 className="text-xl font-semibold">Key Insights & Recommendations</h2>
        </div>
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Residential Growth:</strong> The residential furniture market is showing consistent growth 
            in 2025, with a 15% increase compared to previous year. Businesses should focus on expanding 
            their residential collections, particularly living room furniture which dominates the market share.
          </p>
          <p>
            <strong>Sustainable Materials:</strong> Materials like sustainable wood and recycled metals are seeing 
            significant uptick in demand, with growth rates of 12% and 8% respectively. Incorporating these 
            materials into your product line can attract environmentally-conscious consumers.
          </p>
          <p>
            <strong>Export Opportunities:</strong> Gulf countries remain the strongest export markets, with Saudi Arabia, 
            UAE, and Kuwait leading. However, the US market is showing the highest growth rate at 15%, 
            suggesting potential for market expansion.
          </p>
          <p>
            <strong>Commercial Market Recovery:</strong> Commercial furniture sales are steadily improving after 
            the slowdown in previous years. Office furniture opportunities are emerging as companies 
            redesign workspaces for hybrid work models.
          </p>
        </div>
      </div>
    </div>
  );
}