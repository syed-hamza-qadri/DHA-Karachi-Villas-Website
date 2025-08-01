-- 1. Make the bucket public (optional but recommended for image hosting)
update storage.buckets
set public = true
where name = 'property-images';

-- 2. Allow *anon* role to INSERT (upload) into this bucket
create policy "anon can upload property images"
on storage.objects
for insert
to anon
using (bucket_id = 'property-images');

-- 3. (Optional) allow anon to SELECT/GET the images
create policy "anon can read property images"
on storage.objects
for select
to anon
using (bucket_id = 'property-images');
