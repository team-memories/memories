import os
import pickle
from faker import Faker

fake = Faker()


def make_name_and_profile_img_url():
    name = fake.name()
    return {"name": name, "profile_img_url": f"https://ui-avatars.com/api/?name={name}"}


mock_data = {
    "photos": [
        {
            "id": 0,
            "description": "경부고속도로_1970",
            "original_url": "/media/original/경부고속도로_1970년.jpg",
            "url": "/media/converted/경부고속도로_1970년.png",
            "is_processing": False,
            "title": "1970년 경부고속도로",
            "location": f"대한민국 서울특별시",
            "year": 1970,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 1,
            "description": "1980년 경주",
            "original_url": "/media/original/경주_1980년.jpg",
            "url": "/media/converted/경주_1980년.png",
            "is_processing": False,
            "title": "1980년 경주시 모습",
            "location": f"대한민국 경상북도 경주시",
            "year": 1980,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 2,
            "description": "다시볼 수 없는 1970년 광화문",
            "original_url": "/media/original/광화문_1970년6월.jpg",
            "url": "/media/converted/광화문_1970년6월.png",
            "is_processing": False,
            "title": "광화문 1970년 6월",
            "location": f"대한민국 서울특별시 종로구",
            "year": 1970,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 3,
            "description": "국회의사당_서울특별시 영등포구_1996년",
            "original_url": "/media/original/국회의사당_서울특별시 영등포구_1996년.jpg",
            "url": "/media/converted/국회의사당_서울특별시 영등포구_1996년.png",
            "is_processing": False,
            "title": "국회의사당 1996년",
            "location": f"대한민국 서울특별시 영등포구",
            "year": 1996,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 4,
            "description": "1980년 김포 모습",
            "original_url": "/media/original/김포군_고촌_1980년.jpg",
            "url": "/media/converted/김포군_고촌_1980년.png",
            "is_processing": False,
            "title": "1980년 김포",
            "location": f"대한민국 경기도 김포시",
            "year": 1980,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 5,
            "description": "2015년 김해도심",
            "original_url": "/media/original/김해도심_2015.jpg",
            "url": "/media/converted/김해도심_2015.png",
            "is_processing": False,
            "title": "2015년 김해도심 모습",
            "location": f"대한민국 경상남도 김해시",
            "year": 2015,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 6,
            "description": "난지도 서울월드컵경기장 인근",
            "original_url": "/media/original/난지도 서울월드컵경기장 인근_서울특별시 마포구_2000년.jpg",
            "url": "/media/converted/난지도 서울월드컵경기장 인근_서울특별시 마포구_2000년.png",
            "is_processing": False,
            "title": "2000년 서울월드컵경기장 인근 모습",
            "location": f"대한민국 서울특별시 마포구",
            "year": 2000,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 7,
            "description": "1995년 난지도 인근 가양대교",
            "original_url": "/media/original/난지도 인근 가양대교_서울특별시 마포구_1995년.jpg",
            "url": "/media/converted/난지도 인근 가양대교_서울특별시 마포구_1995년.png",
            "is_processing": False,
            "title": "1995년 가양대교 모습",
            "location": f"대한민국 서울특별시 마포구",
            "year": 1995,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 8,
            "description": "1995년 난지도 인근",
            "original_url": "/media/original/난지도 인근_서울특별시 마포구_1995년.jpg",
            "url": "/media/converted/난지도 인근_서울특별시 마포구_1995년.png",
            "is_processing": False,
            "title": "1995년 난지도 인근 모습",
            "location": f"대한민국 서울특별시 마포구",
            "year": 1995,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 9,
            "description": "1950년 남대문",
            "original_url": "/media/original/남대문_1950년9월28일.jpeg",
            "url": "/media/converted/남대문_1950년9월28일.png",
            "is_processing": False,
            "title": "1950년 9월 28일 남대문 모습",
            "location": f"대한민국 서울특별시 중구",
            "year": 1950,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 10,
            "description": "1950년 남대문 주변 시가지",
            "original_url": "/media/original/남대문_주변_시가지_1950년10월.jpeg",
            "url": "/media/converted/남대문_주변_시가지_1950년10월.png",
            "is_processing": False,
            "title": "1950년 남대문 주변 시가지 모습",
            "location": f"대한민국 서울특별시 중구",
            "year": 1950,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 11,
            "description": "1979년 대전 서부터미널 준공식",
            "original_url": "/media/original/대전 서부터미널 준공식_대전광역시 중구_1979년.PNG",
            "url": "/media/converted/대전 서부터미널 준공식_대전광역시 중구_1979년.png",
            "is_processing": False,
            "title": "1979년 대전 서부터미널 준공식 모습",
            "location": f"대한민국 대전광역시 중구",
            "year": 1979,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 12,
            "description": "1960년 대전 중앙로",
            "original_url": "/media/original/대전 중앙로_대전광역시 중구_1960년.PNG",
            "url": "/media/converted/대전 중앙로_대전광역시 중구_1960년.png",
            "is_processing": False,
            "title": "1960년 대전 중앙로 모습",
            "location": f"대한민국 대전광역시 중구",
            "year": 1960,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 13,
            "description": "1960년 대전 자동차",
            "original_url": "/media/original/대전 차량_대전광역시 중구_1960년.PNG",
            "url": "/media/converted/대전 차량_대전광역시 중구_1960년.png",
            "is_processing": False,
            "title": "1960년 대전 자동차 모습",
            "location": f"대한민국 대전광역시 중구",
            "year": 1960,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 14,
            "description": "1989년 대전 시청",
            "original_url": "/media/original/대전시청_대전광역시 서구_1989년.PNG",
            "url": "/media/converted/대전시청_대전광역시 서구_1989년.png",
            "is_processing": False,
            "title": "1989년 대전 시청 모습",
            "location": f"대한민국 대전광역시 서구",
            "year": 1989,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 15,
            "description": "1950년 대전 시청",
            "original_url": "/media/original/대전시청사_대전광역시 서구_1950년.PNG",
            "url": "/media/converted/대전시청사_대전광역시 서구_1950년.png",
            "is_processing": False,
            "title": "1950년 대전 시청 모습",
            "location": f"대한민국 대전광역시 서구",
            "year": 1950,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 16,
            "description": "1959년 대전역",
            "original_url": "/media/original/대전역사 준공식_대전광역시 동구_1959년.PNG",
            "url": "/media/converted/대전역사 준공식_대전광역시 동구_1959년.png",
            "is_processing": False,
            "title": "1959년 대전역 모습",
            "location": f"대한민국 대전광역시 동구",
            "year": 1959,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 17,
            "description": "1999년 대전정부청사 전경",
            "original_url": "/media/original/대전정부청사 전경_대전광역시 서구_1999년.PNG",
            "url": "/media/converted/대전정부청사 전경_대전광역시 서구_1999년.png",
            "is_processing": False,
            "title": "1999년 대전정부청사 전경 모습",
            "location": f"대한민국 대전광역시 서구",
            "year": 1999,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 18,
            "description": "2000년 대한투자금융",
            "original_url": "/media/original/대한투자금융(구 국립극장)_서울특별시 중구_2000년.jpg",
            "url": "/media/converted/대한투자금융(구 국립극장)_서울특별시 중구_2000년.png",
            "is_processing": False,
            "title": "2000년 대한투자금융 모습",
            "location": f"대한민국 서울특별시 중구",
            "year": 1950,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 19,
            "description": "1996년 청계고가도로",
            "original_url": "/media/original/동족방향의 청계고가도로_서울특별시 중구_1996년.jpg",
            "url": "/media/converted/동족방향의 청계고가도로_서울특별시 중구_1996년.png",
            "is_processing": False,
            "title": "1996년 청계고가도로 모습",
            "location": f"대한민국 서울특별시 중구",
            "year": 1996,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 21,
            "description": "2016 보령시 해수욕장",
            "original_url": "/media/original/보령해수욕장_2016년.jpg",
            "url": "/media/converted/보령해수욕장_2016년.png",
            "is_processing": False,
            "title": "2016년 보령시 해수욕장 모습",
            "location": f"대한민국 충청남도 보령시",
            "year": 2016,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 22,
            "description": "1969년 보문산 전망대",
            "original_url": "/media/original/보문산 전망대_대전광역시 중구_1969년.PNG",
            "url": "/media/converted/보문산 전망대_대전광역시 중구_1969년.png",
            "is_processing": False,
            "title": "1969년 보문산 전망대 모습",
            "location": f"대한민국 대전광역시 중구",
            "year": 1969,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 23,
            "description": "1969년 삼광중학교",
            "original_url": "/media/original/삼광중학교(경덕중학교) 행사_대전광역시 대덕구_1969년.PNG",
            "url": "/media/converted/삼광중학교(경덕중학교) 행사_대전광역시 대덕구_1969년.png",
            "is_processing": False,
            "title": "1969년 삼광중학교 모습",
            "location": f"대한민국 대전광역시 대덕구",
            "year": 1969,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 24,
            "description": "1969년 서울대전고속도로",
            "original_url": "/media/original/서울 대전 고속도로_대전광역시 대덕구_1969년.PNG",
            "url": "/media/converted/서울 대전 고속도로_대전광역시 대덕구_1969년.png",
            "is_processing": False,
            "title": "1969년 서울대전고속도로 모습",
            "location": f"대한민국 대전광역시 대덕구",
            "year": 1969,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 25,
            "description": "2017년 서울",
            "original_url": "/media/original/서울_2017년.jpg",
            "url": "/media/converted/서울_2017년.png",
            "is_processing": False,
            "title": "2017년 서울 모습",
            "location": f"대한민국 서울특별시",
            "year": 2017,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 26,
            "description": "1980년 서울 성북역 앞",
            "original_url": "/media/original/서울성북역앞_1980년.jpg",
            "url": "/media/converted/서울성북역앞_1980년.png",
            "is_processing": False,
            "title": "1980년 서울 성북역 앞 모습",
            "location": f"대한민국 서울특별시 월계동",
            "year": 1980,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 27,
            "description": "1980년 서울역",
            "original_url": "/media/original/서울역_1980년.jpg",
            "url": "/media/converted/서울역_1980년.png",
            "is_processing": False,
            "title": "1980년 서울역 모습",
            "location": f"대한민국 서울특별시 남영동",
            "year": 1980,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 28,
            "description": "1980년 서울역 플랫폼",
            "original_url": "/media/original/서울역플랫폼_2018.jpg",
            "url": "/media/converted/서울역플랫폼_2018.png",
            "is_processing": False,
            "title": "1980년 서울역 플랫폼 모습",
            "location": f"대한민국 서울특별시 남영동",
            "year": 1980,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 29,
            "description": "1940년 동양극장",
            "original_url": "/media/original/서울특별시_동양극장_1940년.jpg",
            "url": "/media/converted/서울특별시_동양극장_1940년.png",
            "is_processing": False,
            "title": "1940년 동양극장 모습",
            "location": f"대한민국 서울특별시 종로구",
            "year": 1940,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 30,
            "description": "2005년 석촌호수",
            "original_url": "/media/original/석촌호수_서울특별시 송파구_2005년.jpg",
            "url": "/media/converted/석촌호수_서울특별시 송파구_2005년.png",
            "is_processing": False,
            "title": "2005년 석촌호수 모습",
            "location": f"대한민국 서울특별시 송파구",
            "year": 2005,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 31,
            "description": "2015년 석촌호수",
            "original_url": "/media/original/석촌호수_서울특별시 송파구_2015년.png",
            "url": "/media/converted/석촌호수_서울특별시 송파구_2015년.png",
            "is_processing": False,
            "title": "2015년 석촌호수 모습",
            "location": f"대한민국 서울특별시 송파구",
            "year": 2015,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 32,
            "description": "1979년 대전 동구 성남2동 놀이터 준공식",
            "original_url": "/media/original/성남2동 놀이터 준공식_대전광역시 동구_1979년.PNG",
            "url": "/media/converted/성남2동 놀이터 준공식_대전광역시 동구_1979년.png",
            "is_processing": False,
            "title": "1979년 대전 동구 성남2동 놀이터 준공식",
            "location": f"대한민국 대전광역시 동구",
            "year": 1979,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 33,
            "description": "2005년 성산대교",
            "original_url": "/media/original/성산대교_서울특별시 양천구_2005년.jpg",
            "url": "/media/converted/성산대교_서울특별시 양천구_2005년.png",
            "is_processing": False,
            "title": "2005년 성산대교",
            "location": f"대한민국 서울특별시 영천구",
            "year": 2005,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 34,
            "description": "1970년 신촌",
            "original_url": "/media/original/신촌_1970년.jpg",
            "url": "/media/converted/신촌_1970년.png",
            "is_processing": False,
            "title": "1970년 신촌 모습",
            "location": f"대한민국 서울특별시 서대문구",
            "year": 1970,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 35,
            "description": "2005년 양천구 목2동 용왕산 사방",
            "original_url": "/media/original/양천구 목2동 용왕산 사방_서울특별시 양천구_2005년.jpg",
            "url": "/media/converted/양천구 목2동 용왕산 사방_서울특별시 양천구_2005년.png",
            "is_processing": False,
            "title": "2005년 양천구 목2동 용왕산 사방",
            "location": f"대한민국 서울특별시 양천구",
            "year": 2005,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 36,
            "description": "1996년 여의도 광장 인근지역",
            "original_url": "/media/original/여의도 광장 인근지역_서울특별시 영등포구_1996년.jpg",
            "url": "/media/converted/여의도 광장 인근지역_서울특별시 영등포구_1996년.png",
            "is_processing": False,
            "title": "1996년 여의도 광장 인근지역 모습",
            "location": f"대한민국 서울특별시 영등포구",
            "year": 1996,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 37,
            "description": "2014년 여의도",
            "original_url": "/media/original/여의도_2014년.jpg",
            "url": "/media/converted/여의도_2014년.png",
            "is_processing": False,
            "title": "2014년 여의도 모습",
            "location": f"대한민국 서울특별시 영등포구",
            "year": 2014,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 38,
            "description": "2004년 여의도공원",
            "original_url": "/media/original/여의도공원_서울특별시 영등포구_2004년.jpg",
            "url": "/media/converted/여의도공원_서울특별시 영등포구_2004년.png",
            "is_processing": False,
            "title": "2004년 여의도공원 모습",
            "location": f"대한민국 서울특별시 영등포구",
            "year": 2004,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 39,
            "description": "1996년 여의도광장",
            "original_url": "/media/original/여의도광장_서울특별시 영등포구_1996년.jpg",
            "url": "/media/converted/여의도광장_서울특별시 영등포구_1996년.png",
            "is_processing": False,
            "title": "1996년 여의도광장 모습",
            "location": f"대한민국 서울특별시 영등포구",
            "year": 1996,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 40,
            "description": "1979년 연정국악회관 성모병원방향 도로",
            "original_url": "/media/original/연정국악회관 성모병원방향 도로모습_대전광역시 중구_1979년.PNG",
            "url": "/media/converted/연정국악회관 성모병원방향 도로모습_대전광역시 중구_1979년.png",
            "is_processing": False,
            "title": "1979년 연정국악회관 성모병원방향 도로 모습",
            "location": f"대한민국 대전광역시 중구",
            "year": 1979,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 41,
            "description": "1962년 울산항 공사",
            "original_url": "/media/original/울산항 공사_울산광역시 남구_1962년.PNG",
            "url": "/media/converted/울산항 공사_울산광역시 남구_1962년.png",
            "is_processing": False,
            "title": "1962년 울산항 공사 모습",
            "location": f"대한민국 울산광역시 남구",
            "year": 1962,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 42,
            "description": "1940년 인천",
            "original_url": "/media/original/인천_1940년.png",
            "url": "/media/converted/인천_1940년.png",
            "is_processing": False,
            "title": "1940년 인천 모습",
            "location": f"대한민국 인천광역시",
            "year": 1940,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 43,
            "description": "1970년 일산",
            "original_url": "/media/original/일산_1970년.jpg",
            "url": "/media/converted/일산_1970년.png",
            "is_processing": False,
            "title": "1970년 일산 모습",
            "location": f"대한민국 경기도 고양시",
            "year": 1970,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 44,
            "description": "1970년 일산",
            "original_url": "/media/original/일산_1970년 (1).jpg",
            "url": "/media/converted/일산_1970년 (1).png",
            "is_processing": False,
            "title": "1970년 일산 모습",
            "location": f"대한민국 경기도 일산시",
            "year": 1970,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 45,
            "description": "1996년 청계고가도로",
            "original_url": "/media/original/청계고가도로와 동쪽 방향_서울특별시 중구_1996년.jpg",
            "url": "/media/converted/청계고가도로와 동쪽 방향_서울특별시 중구_1996년.png",
            "is_processing": False,
            "title": "1996년 청계고가도로 모습",
            "location": f"대한민국 서울특별시 중구",
            "year": 1996,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 46,
            "description": "1999년 청계천 주변",
            "original_url": "/media/original/청계천 주변_서울특별시 종로구_1999년.jpg",
            "url": "/media/converted/청계천 주변_서울특별시 종로구_1999년.png",
            "is_processing": False,
            "title": "1999년 청계천 주변 모습",
            "location": f"대한민국 서울특별시 종로구",
            "year": 1999,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 47,
            "description": "2014년 청계천",
            "original_url": "/media/original/청계천_서울특별시 종로구_2014년.jpg",
            "url": "/media/converted/청계천_서울특별시 종로구_2014년.png",
            "is_processing": False,
            "title": "2014년 청계천 모습",
            "location": f"대한민국 서울특별시 종로구",
            "year": 2014,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 48,
            "description": "2005년 청계천",
            "original_url": "/media/original/청계천_서울특별시 중구_2005년.jpg",
            "url": "/media/converted/청계천_서울특별시 중구_2005년.png",
            "is_processing": False,
            "title": "2005년 청계천 모습",
            "location": f"대한민국 서울특별시 중구",
            "year": 2005,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 49,
            "description": "2014년 청계천문화관",
            "original_url": "/media/original/청계천문화관_서울특별시 성동구_2014년.jpg",
            "url": "/media/converted/청계천문화관_서울특별시 성동구_2014년.png",
            "is_processing": False,
            "title": "2014년 청계천문화관",
            "location": f"대한민국 서울특별시 성동구",
            "year": 2014,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 50,
            "description": "1964년 태화교",
            "original_url": "/media/original/태화교_대구광역시 남구_1964년.PNG",
            "url": "/media/converted/태화교_대구광역시 남구_1964년.png",
            "is_processing": False,
            "title": "1964년 태화교 모습",
            "location": f"대한민국 대구광역시 남구",
            "year": 1964,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 51,
            "description": "2005년 하늘공원 개발",
            "original_url": "/media/original/하늘공원 개발_서울특별시 마포구_2005년.jpg",
            "url": "/media/converted/하늘공원 개발_서울특별시 마포구_2005년.png",
            "is_processing": False,
            "title": "2005년 하늘공원 개발 모습",
            "location": f"대한민국 서울특별시 마포구",
            "year": 2005,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 53,
            "description": "1960년 학산교 준공식",
            "original_url": "/media/original/학산교 준공식_울산광역시 북구_1960.PNG",
            "url": "/media/converted/학산교 준공식_울산광역시 북구_1960.png",
            "is_processing": False,
            "title": "1960년 학산교 준공식 모습",
            "location": f"대한민국 울산광역시 북구",
            "year": 1960,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
        {
            "id": 54,
            "description": "1996년 LG트윈타워 앞",
            "original_url": "/media/original/LG트윈타워 앞_서울특별시 영등포구_1996년 .jpg",
            "url": "/media/converted/LG트윈타워 앞_서울특별시 영등포구_1996년 .png",
            "is_processing": False,
            "title": "1996년 LG트윈타워 앞 모습",
            "location": f"대한민국 서울특별시 영등포구",
            "year": 1996,
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                **make_name_and_profile_img_url(),
            }
        },
    ],
    "videos": [
        {
            "id": 0,
            "description": "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When "
                           "one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no "
                           "bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical "
                           "revenge.\n\nLicensed under the Creative Commons Attribution "
                           "license\nhttp://www.bigbuckbunny.org",
            "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            "subtitle": "By Blender Foundation",
            "thumb": "images/BigBuckBunny.jpg",
            "is_processing": False,
            "title": "Big Buck Bunny",
            "location": "대한민국 경기도 시흥시",
            "year": 1997,
            "author": {
                "id": 1,
                "email": "rev1c0sm0s@gmail.com",
                "name": "YunHyeok Kwak",
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
            },
        },
        {
            "id": 1,
            "description": "The first Blender Open Movie from 2006",
            "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            "subtitle": "By Blender Foundation",
            "thumb": "images/ElephantsDream.jpg",
            "is_processing": False,
            "title": "Elephant Dream",
            "location": "대한민국 충청북도 청주시 서원구",
            "year": 1999,
            "author": {
                "id": 1,
                "email": "rev1c0sm0s@gmail.com",
                "name": "YunHyeok Kwak",
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
            },
        },
        {
            "id": 2,
            "description": "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For "
                           "when you want to settle into your Iron Throne to watch the latest episodes. For "
                           "$35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
            "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "subtitle": "By Google",
            "thumb": "images/ForBiggerBlazes.jpg",
            "is_processing": False,
            "title": "For Bigger Blazes",
            "location": "대한민국 경기도 군포시",
            "year": 1969,
            "author": {
                "id": 1,
                "email": "rev1c0sm0s@gmail.com",
                "name": "YunHyeok Kwak",
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
            },
        },
        {
            "id": 3,
            "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for "
                           "when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with "
                           "Google Play Movies and more at google.com/chromecast.",
            "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "subtitle": "By Google",
            "thumb": "images/ForBiggerEscapes.jpg",
            "is_processing": False,
            "title": "For Bigger Escape",
            "location": "대한민국 경기도 시흥시",
            "year": 2010,
            "author": {
                "id": 1,
                "email": "rev1c0sm0s@gmail.com",
                "name": "YunHyeok Kwak",
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
            },
        },
        {
            "id": 4,
            "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For "
                           "$35.  Find out more at google.com/chromecast.",
            "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "subtitle": "By Google",
            "thumb": "images/ForBiggerFun.jpg",
            "is_processing": False,
            "title": "For Bigger Fun",
            "location": "대한민국 경기도 시흥시",
            "year": 2006,
            "author": {
                "id": 1,
                "email": "rev1c0sm0s@gmail.com",
                "name": "YunHyeok Kwak",
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
            },
        },
        {
            "id": 5,
            "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for "
                           "the times that call for bigger joyrides. For $35. Learn how to use Chromecast with "
                           "YouTube and more at google.com/chromecast.",
            "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            "subtitle": "By Google",
            "thumb": "images/ForBiggerJoyrides.jpg",
            "is_processing": False,
            "title": "For Bigger Joyrides",
            "location": "대한민국 경기도 시흥시",
            "year": 1999,
            "author": {
                "id": 1,
                "email": "rev1c0sm0s@gmail.com",
                "name": "YunHyeok Kwak",
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
            },
        },
        {
            "id": 6,
            "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for "
                           "when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use "
                           "Chromecast with Netflix and more at google.com/chromecast.",
            "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            "subtitle": "By Google",
            "thumb": "images/ForBiggerMeltdowns.jpg",
            "is_processing": False,
            "title": "For Bigger Meltdowns",
            "location": "대한민국 경기도 부천시",
            "year": 1976,
            "author": {
                "id": 1,
                "email": "rev1c0sm0s@gmail.com",
                "name": "YunHyeok Kwak",
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
            },
        },
        {
            "id": 7,
            "description": "Sintel is an independently produced short film, initiated by the Blender Foundation as a "
                           "means to further improve and valiyear the free/open source 3D creation suite Blender. "
                           "With initial funding provided by 1000s of donations via the internet community, "
                           "it has again proven to be a viable development model for both open 3D technology as for "
                           "independent animation film.\nThis 15 minute film has been realized in the studio of the "
                           "Amsterdam Blender Institute, by an international team of artists and developers. In "
                           "addition to that, several crucial technical and creative targets have been realized "
                           "online, by developers and artists and teams all over the world.\nwww.sintel.org",
            "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            "subtitle": "By Blender Foundation",
            "thumb": "images/Sintel.jpg",
            "is_processing": False,
            "title": "Sintel",
            "location": "대한민국 경기도",
            "year": 1972,
            "author": {
                "id": 1,
                "email": "rev1c0sm0s@gmail.com",
                "name": "YunHyeok Kwak",
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
            },
        },
        {
            "id": 8,
            "description": "Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes "
                           "our customer-appreciation Balloon Launch will get some free T-shirts into the hands of "
                           "our viewers.",
            "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
            "subtitle": "By Garage419",
            "thumb": "images/SubaruOutbackOnStreetAndDirt.jpg",
            "is_processing": False,
            "title": "Subaru Outback On Street And Dirt",
            "location": "대한민국 경기도 군포시",
            "year": 1989,
            "author": {
                "id": 1,
                "email": "rev1c0sm0s@gmail.com",
                "name": "YunHyeok Kwak",
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
            },
        },
        {
            "id": 9,
            "description": "Tears of Steel was realized with crowd-funding by users of the open source 3D creation "
                           "tool Blender. Target was to improve and test a complete open and free pipeline for visual "
                           "effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands.  "
                           "The film itself, and all raw material used for making it, have been released under the "
                           "Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out "
                           "more about this, or to purchase the 4-DVD box with a lot of extras.  (CC) Blender "
                           "Foundation - http://www.tearsofsteel.org",
            "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            "subtitle": "By Blender Foundation",
            "thumb": "images/TearsOfSteel.jpg",
            "is_processing": False,
            "title": "Tears of Steel",
            "location": "대한민국 경기도 군포시",
            "year": 1957,
            "author": {
                "id": 1,
                "email": "rev1c0sm0s@gmail.com",
                "name": "YunHyeok Kwak",
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
            },
        },
        {
            "id": 10,
            "description": "The Smoking Tire heads out to Adams Motorsports Park in Riverside, CA to test the most "
                           "requested car of 2010, the Volkswagen GTI. Will it beat the Mazdaspeed3's "
                           "standard-setting lap time? Watch and see...",
            "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
            "subtitle": "By Garage419",
            "thumb": "images/VolkswagenGTIReview.jpg",
            "is_processing": False,
            "title": "Volkswagen GTI Review",
            "location": "대한민국 경기도 시흥시",
            "year": 1969,
            "author": {
                "id": 1,
                "email": "rev1c0sm0s@gmail.com",
                "name": "YunHyeok Kwak",
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
            },
        },
        {
            "id": 11,
            "description": "The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500, "
                           "and posting a video from the road every single day! The only place to watch them is by "
                           "subscribing to The Smoking Tire or watching at BlackMagicShine.com",
            "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
            "subtitle": "By Garage419",
            "thumb": "images/WeAreGoingOnBullrun.jpg",
            "is_processing": False,
            "title": "We Are Going On Bullrun",
            "location": "대한민국 경기도 군포시",
            "year": 1977,
            "author": {
                "id": 1,
                "email": "rev1c0sm0s@gmail.com",
                "name": "YunHyeok Kwak",
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
            },
        },
        {
            "id": 12,
            "description": "The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far "
                           "$1,000 can go when looking for a car.The Smoking Tire meets up with Chris and Jorge from "
                           "CarsForAGrand.com to see just how far $1,000 can go when looking for a car.",
            "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            "subtitle": "By Garage419",
            "thumb": "images/WhatCarCanYouGetForAGrand.jpg",
            "is_processing": False,
            "title": "What care can you get for a grand?",
            "location": "대한민국",
            "year": 1980,
            "author": {
                "id": 1,
                "email": "rev1c0sm0s@gmail.com",
                "name": "YunHyeok Kwak",
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
            },
        },
    ],
}


class MockDB:
    def __init__(self):
        pickle.dump(mock_data, open("mock_db.dump", "wb"))

    def __getitem__(self, key):
        return pickle.load(open("mock_db.dump", "rb"))[key]

    def __setitem__(self, key, value):
        mock_db_dump = pickle.load(open("mock_db.dump", "rb"))
        mock_db_dump[key] = value
        pickle.dump(mock_db_dump, open("mock_db.dump", "wb"))

    def __del__(self):
        try:
            os.remove("mock_db.dump")
        except OSError:
            pass


DB = MockDB()
