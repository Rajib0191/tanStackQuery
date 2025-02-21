# Some important notes about tanStack Query

# Keywords:

1. gcTime:1000(garbage collection)
   => Since there are no more active instances of this query, a garbage collection timeout is set using gcTime to delete and garbage collect the query (defaults to 5 minutes).

2. staleTime:5000(default time 0)
   => is a configuration options that determines how long fetched data is considered fresh before it needs to be refetch.

3. polling:
   => is a technique to fetching data from an API at regular intervals to keep the UI up-to-date with the latest information.If data changes frequently then you can use this option.

4. refetchInterval:1000
   => It's a way to enable pooling.it's mean that after interval(milliseconds) React Query should automatically refetch the data.

5. refetchIntervalBackground:true
   => If we change the page or go to other page then that api is calling in the background.

6. placeholderData:keepPreviousData,
   => When page change it's not showing loading. Just change the data into the background.
