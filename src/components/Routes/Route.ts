export default interface Route { 
    Legs: {
        StartPosition: number[];
        EndPosition: number[];
        Distance: number;
        DurationSeconds: number;
        Geometry: {
            LineString: never[][];
        };
        Steps: {
            StartPosition: number[];
            EndPosition: number[];
            Distance: number;
            DurationSeconds: number;
            GeometryOffset: number;
        }[],
    }[],
    Summary: {
        RouteBBox: number[];
        DataSource: string;
        Distance: number;
        DurationSeconds: number;
        DistanceUnit: string
    };
}
