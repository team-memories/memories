import pickle
from faker import Faker
fake = Faker("ko_KR")

mock_data = {
    "photos": [
        {
            "id": 0,
            "description": fake.text(),
            "original_url": "https://via.placeholder.com/480x270.png",
            "url": "https://via.placeholder.com/1920x1080.png",
            "is_processing": False,
            "title": fake.text(),
            "location": f"대한민국 {fake.city()}",
            "year": int(fake.year()),
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                "name": fake.name(),
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4"
            }
        },
        {
            "id": 1,
            "description": fake.text(),
            "original_url": "https://via.placeholder.com/480x270.png",
            "url": "https://via.placeholder.com/1920x1080.png",
            "is_processing": False,
            "title": fake.text(),
            "location": f"대한민국 {fake.city()}",
            "year": int(fake.year()),
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                "name": fake.name(),
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4"
            }
        },
        {
            "id": 2,
            "description": fake.text(),
            "original_url": "https://via.placeholder.com/480x270.png",
            "url": "https://via.placeholder.com/1920x1080.png",
            "is_processing": False,
            "title": fake.text(),
            "location": f"대한민국 {fake.city()}",
            "year": int(fake.year()),
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                "name": fake.name(),
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4"
            }
        },
        {
            "id": 3,
            "description": fake.text(),
            "original_url": "https://via.placeholder.com/480x270.png",
            "url": "https://via.placeholder.com/1920x1080.png",
            "is_processing": False,
            "title": fake.text(),
            "location": f"대한민국 {fake.city()}",
            "year": int(fake.year()),
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                "name": fake.name(),
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4"
            }
        },
        {
            "id": 4,
            "description": fake.text(),
            "original_url": "https://via.placeholder.com/480x270.png",
            "url": "https://via.placeholder.com/1920x1080.png",
            "is_processing": False,
            "title": fake.text(),
            "location": f"대한민국 {fake.city()}",
            "year": int(fake.year()),
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                "name": fake.name(),
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4"
            }
        },
        {
            "id": 5,
            "description": fake.text(),
            "original_url": "https://via.placeholder.com/480x270.png",
            "url": "https://via.placeholder.com/1920x1080.png",
            "is_processing": False,
            "title": fake.text(),
            "location": f"대한민국 {fake.city()}",
            "year": int(fake.year()),
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                "name": fake.name(),
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4"
            }
        },
        {
            "id": 6,
            "description": fake.text(),
            "original_url": "https://via.placeholder.com/480x270.png",
            "url": "https://via.placeholder.com/1920x1080.png",
            "is_processing": False,
            "title": fake.text(),
            "location": f"대한민국 {fake.city()}",
            "year": int(fake.year()),
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                "name": fake.name(),
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4"
            }
        },
        {
            "id": 7,
            "description": fake.text(),
            "original_url": "https://via.placeholder.com/640x360.png",
            "url": "https://via.placeholder.com/2560x1440.png",
            "is_processing": False,
            "title": fake.text(),
            "location": f"대한민국 {fake.city()}",
            "year": int(fake.year()),
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                "name": fake.name(),
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4"
            }
        },
        {
            "id": 8,
            "description": fake.text(),
            "original_url": "https://via.placeholder.com/640x360.png",
            "url": "https://via.placeholder.com/2560x1440.png",
            "is_processing": False,
            "title": fake.text(),
            "location": f"대한민국 {fake.city()}",
            "year": int(fake.year()),
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                "name": fake.name(),
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4"
            }
        },
        {
            "id": 9,
            "description": fake.text(),
            "original_url": "https://via.placeholder.com/640x360.png",
            "url": "https://via.placeholder.com/2560x1440.png",
            "is_processing": False,
            "title": fake.text(),
            "location": f"대한민국 {fake.city()}",
            "year": int(fake.year()),
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                "name": fake.name(),
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4"
            }
        },
        {
            "id": 10,
            "description": fake.text(),
            "original_url": "https://via.placeholder.com/640x360.png",
            "url": "https://via.placeholder.com/2560x1440.png",
            "is_processing": False,
            "title": fake.text(),
            "location": f"대한민국 {fake.city()}",
            "year": int(fake.year()),
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                "name": fake.name(),
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4"
            }
        },
        {
            "id": 11,
            "description": fake.text(),
            "original_url": "https://via.placeholder.com/640x360.png",
            "url": "https://via.placeholder.com/2560x1440.png",
            "is_processing": False,
            "title": fake.text(),
            "location": f"대한민국 {fake.city()}",
            "year": int(fake.year()),
            "author": {
                "id": fake.building_number(),
                "email": fake.email(),
                "name": fake.name(),
                "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4"
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


class MockDB(object):
    def __init__(self):
        pickle.dump(mock_data, open("mock_db.dump", "wb"))

    def __getitem__(self, key):
        return pickle.load(open("mock_db.dump", "rb"))[key]

    def __setitem__(self, key, value):
        mock_db_dump = pickle.load(open("mock_db.dump", "rb"))
        mock_db_dump[key] = value
        pickle.dump(mock_db_dump, open("mock_db.dump", "wb"))


DB = MockDB()
