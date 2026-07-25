# Handle Domain Root

Cloudfront does not have a static IP for Namecheap alias records to point to.

Namecheap NS point to route 53 and route 53 points to Cloudfront.

Both Route 53 and Cloudfront need to query the domain from Namecheap.
