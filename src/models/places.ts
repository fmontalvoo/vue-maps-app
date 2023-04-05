export interface Place {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:                   string;
    type:                 string;
    place_type:           string[];
    relevance:            number;
    properties:           Properties;
    text_es:              string;
    place_name_es:        string;
    text:                 string;
    place_name:           string;
    center:               number[];
    geometry:             Geometry;
    context:              Context[];
    language_es?:         string;
    language?:            string;
    matching_text?:       string;
    matching_place_name?: string;
}

export interface Context {
    id:           string;
    mapbox_id:    string;
    text_es:      string;
    text:         string;
    wikidata?:    string;
    language_es?: string;
    language?:    string;
    short_code?:  string;
}


export interface Geometry {
    coordinates: number[];
    type:        string;
}

export interface Properties {
    foursquare: string;
    landmark:   boolean;
    address?:   string;
    category:   string;
    maki:       string;
    wikidata?:  string;
}
