'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  Download,
  Eye,
} from 'lucide-react';
import { AnalysisResult, FilterOptions, SortField, SortDirection } from '@/lib/types/analysis';
import { cn } from '@/lib/utils';

interface ResultsTableProps {
  results: AnalysisResult[];
  onViewDetails?: (result: AnalysisResult) => void;
  onExport?: (filteredResults: AnalysisResult[]) => void;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({
  results,
  onViewDetails,
  onExport,
}) => {
  const [sortField, setSortField] = useState<SortField>('analyzedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(false);

  // Filtering logic
  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          result.filename.toLowerCase().includes(query) ||
          result.cropType.toLowerCase().includes(query) ||
          result.findings.some((f) => f.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Crop type filter
      if (filters.cropType && filters.cropType.length > 0) {
        if (!filters.cropType.includes(result.cropType)) return false;
      }

      // Detection type filter
      if (filters.detectionType && filters.detectionType.length > 0) {
        if (!filters.detectionType.includes(result.detectionType)) return false;
      }

      // Severity filter
      if (filters.severity && filters.severity.length > 0) {
        if (!filters.severity.includes(result.severity)) return false;
      }

      // Confidence filter
      if (filters.confidenceMin !== undefined) {
        if (result.confidence < filters.confidenceMin) return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const date = new Date(result.analyzedAt);
        if (date < filters.dateRange.from || date > filters.dateRange.to) {
          return false;
        }
      }

      return true;
    });
  }, [results, searchQuery, filters]);

  // Sorting logic
  const sortedResults = useMemo(() => {
    return [...filteredResults].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Handle date comparison
      if (sortField === 'analyzedAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Handle severity ordering
      if (sortField === 'severity') {
        const severityOrder = { none: 0, low: 1, medium: 2, high: 3, critical: 4 };
        aValue = severityOrder[aValue as keyof typeof severityOrder];
        bValue = severityOrder[bValue as keyof typeof severityOrder];
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredResults, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'none':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              {filteredResults.length} of {results.length} results
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            {onExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExport(sortedResults)}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by filename, crop type, or findings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border rounded-lg bg-muted/50">
              <Select
                value={filters.cropType?.[0]}
                onValueChange={(value) =>
                  setFilters({ ...filters, cropType: value ? [value] : [] })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Crop Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="corn">Corn</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="soybean">Soybean</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.severity?.[0]}
                onValueChange={(value) =>
                  setFilters({ ...filters, severity: value ? [value] : [] })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.detectionType?.[0]}
                onValueChange={(value) =>
                  setFilters({ ...filters, detectionType: value ? [value] : [] })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Detection Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="disease">Disease</SelectItem>
                  <SelectItem value="pest">Pest</SelectItem>
                  <SelectItem value="nutrient">Nutrient</SelectItem>
                  <SelectItem value="healthy">Healthy</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setFilters({});
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Results Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('analyzedAt')}
                      className="flex items-center gap-1"
                    >
                      Date
                      {getSortIcon('analyzedAt')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('cropType')}
                      className="flex items-center gap-1"
                    >
                      Crop Type
                      {getSortIcon('cropType')}
                    </Button>
                  </TableHead>
                  <TableHead>Detection</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('severity')}
                      className="flex items-center gap-1"
                    >
                      Severity
                      {getSortIcon('severity')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('confidence')}
                      className="flex items-center gap-1"
                    >
                      Confidence
                      {getSortIcon('confidence')}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedResults.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No results found
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>
                        <img
                          src={result.imageUrl}
                          alt={result.filename}
                          className="h-12 w-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(result.analyzedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{result.cropType}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{result.detectionType}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn('text-xs', getSeverityColor(result.severity))}
                        >
                          {result.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={cn('font-medium', getConfidenceColor(result.confidence))}>
                          {result.confidence}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewDetails?.(result)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
