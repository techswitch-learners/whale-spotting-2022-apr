using System;

namespace WhaleSpotting.Models.Request
{
    public class SightingSearchRequest
    {
        public int? SpeciesId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}
