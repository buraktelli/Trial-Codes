INSERT INTO public.company (name, contact_person, email, phone, tax_no, tax_office, country, city, address, "createdAt", "updatedAt")
	VALUES('Riyad', 'Muaviye Kadish', 'riyad@ankageo.com', '+90.212.4787000', 'HALKALI', '0123456789', 'Turkey', 'İstanbul', 
		   'YTÜ Teknopark İkitelli OSB Mah., Başakşehir', NOW(), NOW());
		   
INSERT INTO public.user (company_id, email, phone, password, first_name, last_name, user_type, is_active, "createdAt", "updatedAt")
	VALUES (6, 'muaviye.kadish@ankageo.com', '+90.212.4780000', '$2b$10$VS4MOOm7Z6FS4PdROnSpmuhtYpIN178UFKx55KzvBuMdyklAvm.oq', 'Muaviye', 'Kadish', 'normal', 'true', NOW(), NOW());
	
INSERT INTO public.payment (company_id, user_id, total, invoice_status, payment_type, currency, "createdAt", "updatedAt") 
	VALUES(6, 6, 10000, 'false', 'PAYPAL', 'USD', NOW(), NOW());
	
INSERT INTO public.license (payment_id, package_detail_id, company_id,license_key, activated, expire_date, "createdAt", "updatedAt") 
	VALUES(5, 1, 6,'e50a2c34-2b46-4290-9090-33ceab2d85e5', 'false', '2022-05-27', NOW(), NOW());



Bu scriptlerle dbde license olusturulduktan sonra serverda redis servisi kurulur. Patlamamasi icin redis-cli da config ayarlari yapilir. 
Socket installation servisi calistirilir.
Lisans aktiflestirilir.

