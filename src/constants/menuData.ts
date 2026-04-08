export type TimeOfDay = 'MORNING' | 'LUNCH' | 'DINNER';
export type Category = 'KOREAN' | 'CHINESE' | 'WESTERN' | 'JAPANESE' | 'RANDOM';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: Exclude<Category, 'RANDOM'>;
  times: TimeOfDay[];
  image: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // KOREAN - Morning
  { id: 'k1', name: '전복죽', description: '속이 편안하고 영양 가득한 아침 식사', category: 'KOREAN', times: ['MORNING'], image: 'https://picsum.photos/seed/abalone/400/300' },
  { id: 'k2', name: '콩나물국밥', description: '시원한 국물로 깨우는 아침', category: 'KOREAN', times: ['MORNING'], image: 'https://picsum.photos/seed/sprout/400/300' },
  { id: 'k3', name: '계란말이와 김', description: '간단하지만 든든한 집밥 스타일', category: 'KOREAN', times: ['MORNING'], image: 'https://picsum.photos/seed/eggroll/400/300' },
  { id: 'k4', name: '누룽지', description: '구수하고 따뜻한 아침의 시작', category: 'KOREAN', times: ['MORNING'], image: 'https://picsum.photos/seed/nurungji/400/300' },
  { id: 'k13', name: '소고기무국', description: '맑고 시원한 국물로 든든하게', category: 'KOREAN', times: ['MORNING'], image: 'https://picsum.photos/seed/beefsoup/400/300' },
  { id: 'k14', name: '호박죽', description: '달콤하고 부드러운 아침', category: 'KOREAN', times: ['MORNING'], image: 'https://picsum.photos/seed/pumpkin/400/300' },
  
  // KOREAN - Lunch/Dinner
  { id: 'k5', name: '비빔밥', description: '신선한 나물과 고추장의 조화', category: 'KOREAN', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/bibimbap/400/300' },
  { id: 'k6', name: '김치찌개', description: '한국인의 소울푸드, 얼큰한 맛', category: 'KOREAN', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/kimchi/400/300' },
  { id: 'k7', name: '불고기', description: '달콤 짭짤한 남녀노소 인기 메뉴', category: 'KOREAN', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/bulgogi/400/300' },
  { id: 'k8', name: '제육볶음', description: '매콤한 양념으로 입맛 돋우는 점심', category: 'KOREAN', times: ['LUNCH'], image: 'https://picsum.photos/seed/pork/400/300' },
  { id: 'k9', name: '삼겹살', description: '지글지글 소리와 함께 즐기는 저녁', category: 'KOREAN', times: ['DINNER'], image: 'https://picsum.photos/seed/bbq/400/300' },
  { id: 'k10', name: '닭볶음탕', description: '푸짐하게 즐기는 매콤한 닭요리', category: 'KOREAN', times: ['DINNER'], image: 'https://picsum.photos/seed/chicken/400/300' },
  { id: 'k15', name: '된장찌개', description: '구수한 된장의 깊은 맛', category: 'KOREAN', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/doenjang/400/300' },
  { id: 'k16', name: '갈비찜', description: '부드러운 고기와 달콤한 양념', category: 'KOREAN', times: ['DINNER'], image: 'https://picsum.photos/seed/galbi/400/300' },
  { id: 'k17', name: '냉면', description: '가슴속까지 시원해지는 육수', category: 'KOREAN', times: ['LUNCH'], image: 'https://picsum.photos/seed/naengmyeon/400/300' },
  { id: 'k18', name: '보쌈', description: '담백하게 삶아낸 돼지고기 수육', category: 'KOREAN', times: ['DINNER'], image: 'https://picsum.photos/seed/bossam/400/300' },

  // CHINESE
  { id: 'c1', name: '짜장면', description: '언제 먹어도 맛있는 국민 중식', category: 'CHINESE', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/jajang/400/300' },
  { id: 'c2', name: '짬뽕', description: '해산물 가득, 얼큰한 국물 요리', category: 'CHINESE', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/jjamppong/400/300' },
  { id: 'c3', name: '탕수육', description: '바삭한 튀김과 새콤달콤 소스', category: 'CHINESE', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/tangsuyuk/400/300' },
  { id: 'c4', name: '마파두부', description: '부드러운 두부와 매콤한 소스', category: 'CHINESE', times: ['LUNCH'], image: 'https://picsum.photos/seed/tofu/400/300' },
  { id: 'c5', name: '양장피', description: '톡 쏘는 겨자 소스와 신선한 재료', category: 'CHINESE', times: ['DINNER'], image: 'https://picsum.photos/seed/yangjangpi/400/300' },
  { id: 'c6', name: '딤섬', description: '한 입 크기의 다채로운 즐거움', category: 'CHINESE', times: ['MORNING', 'LUNCH'], image: 'https://picsum.photos/seed/dimsum/400/300' },
  { id: 'c8', name: '유린기', description: '바삭한 닭튀김과 상큼한 간장 소스', category: 'CHINESE', times: ['DINNER'], image: 'https://picsum.photos/seed/yuringi/400/300' },
  { id: 'c9', name: '볶음밥', description: '고소하게 볶아낸 중식 볶음밥', category: 'CHINESE', times: ['LUNCH'], image: 'https://picsum.photos/seed/friedrice/400/300' },
  { id: 'c10', name: '깐풍기', description: '매콤달콤한 소스의 닭요리', category: 'CHINESE', times: ['DINNER'], image: 'https://picsum.photos/seed/kkanpunggi/400/300' },

  // WESTERN
  { id: 'w1', name: '에그 베네딕트', description: '브런치로 즐기는 우아한 아침', category: 'WESTERN', times: ['MORNING'], image: 'https://picsum.photos/seed/benedict/400/300' },
  { id: 'w2', name: '팬케이크', description: '달콤한 시럽과 함께하는 아침', category: 'WESTERN', times: ['MORNING'], image: 'https://picsum.photos/seed/pancake/400/300' },
  { id: 'w3', name: '까르보나라', description: '고소한 크림 소스 파스타', category: 'WESTERN', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/pasta/400/300' },
  { id: 'w4', name: '수제 버거', description: '육즙 가득한 패티와 신선한 야채', category: 'WESTERN', times: ['LUNCH'], image: 'https://picsum.photos/seed/burger/400/300' },
  { id: 'w5', name: '티본 스테이크', description: '특별한 저녁을 위한 최고의 선택', category: 'WESTERN', times: ['DINNER'], image: 'https://picsum.photos/seed/steak/400/300' },
  { id: 'w6', name: '마르게리따 피자', description: '담백하고 깔끔한 이탈리안 피자', category: 'WESTERN', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/pizza/400/300' },
  { id: 'w8', name: '프렌치 토스트', description: '폭신폭신하고 달콤한 아침', category: 'WESTERN', times: ['MORNING'], image: 'https://picsum.photos/seed/frenchtoast/400/300' },
  { id: 'w9', name: '라자냐', description: '겹겹이 쌓인 치즈와 고기 소스', category: 'WESTERN', times: ['DINNER'], image: 'https://picsum.photos/seed/lasagna/400/300' },
  { id: 'w10', name: '리조또', description: '부드럽고 고소한 쌀 요리', category: 'WESTERN', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/risotto/400/300' },
  { id: 'w11', name: '감바스', description: '마늘 향 가득한 새우 요리', category: 'WESTERN', times: ['DINNER'], image: 'https://picsum.photos/seed/gambas/400/300' },

  // JAPANESE
  { id: 'j1', name: '낫또 정식', description: '건강을 생각하는 일본식 아침', category: 'JAPANESE', times: ['MORNING'], image: 'https://picsum.photos/seed/natto/400/300' },
  { id: 'j2', name: '돈카츠', description: '겉바속촉, 두툼한 고기 튀김', category: 'JAPANESE', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/tonkatsu/400/300' },
  { id: 'j3', name: '초밥 세트', description: '신선한 해산물의 풍미', category: 'JAPANESE', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/sushi/400/300' },
  { id: 'j4', name: '라멘', description: '진한 국물과 쫄깃한 면발', category: 'JAPANESE', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/ramen/400/300' },
  { id: 'j5', name: '규동', description: '부드러운 소고기 덮밥', category: 'JAPANESE', times: ['LUNCH'], image: 'https://picsum.photos/seed/gyudon/400/300' },
  { id: 'j6', name: '사시미 모리아와세', description: '다양한 생선회를 한 번에', category: 'JAPANESE', times: ['DINNER'], image: 'https://picsum.photos/seed/sashimi/400/300' },
  { id: 'j8', name: '우동', description: '탱글탱글한 면발과 깔끔한 국물', category: 'JAPANESE', times: ['LUNCH'], image: 'https://picsum.photos/seed/udon/400/300' },
  { id: 'j9', name: '텐동', description: '바삭한 튀김이 올라간 덮밥', category: 'JAPANESE', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/tendon/400/300' },
  { id: 'j10', name: '스키야키', description: '따뜻한 국물에 적셔 먹는 소고기', category: 'JAPANESE', times: ['DINNER'], image: 'https://picsum.photos/seed/sukiyaki/400/300' },
  { id: 'j11', name: '오니기리', description: '간편하게 즐기는 일본식 주먹밥', category: 'JAPANESE', times: ['MORNING', 'LUNCH'], image: 'https://picsum.photos/seed/onigiri/400/300' },
  
  // More items
  { id: 'k11', name: '김밥', description: '간편하게 즐기는 한 끼', category: 'KOREAN', times: ['MORNING', 'LUNCH'], image: 'https://picsum.photos/seed/gimbap/400/300' },
  { id: 'k12', name: '떡볶이', description: '매콤달콤한 국민 간식 겸 식사', category: 'KOREAN', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/tteokbokki/400/300' },
  { id: 'w7', name: '시저 샐러드', description: '가볍고 신선한 한 끼', category: 'WESTERN', times: ['MORNING', 'LUNCH'], image: 'https://picsum.photos/seed/salad/400/300' },
  { id: 'j7', name: '오코노미야끼', description: '맥주와 잘 어울리는 저녁 메뉴', category: 'JAPANESE', times: ['DINNER'], image: 'https://picsum.photos/seed/okonomiyaki/400/300' },
  { id: 'c7', name: '꿔바로우', description: '쫀득한 식감의 탕수육', category: 'CHINESE', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/kkwo/400/300' },
  { id: 'k19', name: '순두부찌개', description: '부드러운 순두부와 매콤한 국물', category: 'KOREAN', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/sundubu/400/300' },
  { id: 'w12', name: '클럽 샌드위치', description: '신선한 재료가 층층이 쌓인 샌드위치', category: 'WESTERN', times: ['MORNING', 'LUNCH'], image: 'https://picsum.photos/seed/sandwich/400/300' },
  { id: 'j12', name: '카츠카레', description: '돈카츠와 카레의 환상적인 만남', category: 'JAPANESE', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/curry/400/300' },
  { id: 'c11', name: '멘보샤', description: '바삭한 식빵 사이 탱글한 새우', category: 'CHINESE', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/menbosha/400/300' },
  { id: 'k20', name: '육회비빔밥', description: '신선한 육회와 나물의 조화', category: 'KOREAN', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/yukhoe/400/300' },
  { id: 'c12', name: '마라탕', description: '중독성 강한 얼큰하고 얼얼한 맛', category: 'CHINESE', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/malatang/400/300' },
  { id: 'c13', name: '탕후루', description: '달콤하고 바삭한 과일 사탕', category: 'CHINESE', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/tanghulu/400/300' },
  { id: 'w13', name: '크로플', description: '크로와상 생지로 만든 바삭한 와플', category: 'WESTERN', times: ['MORNING', 'LUNCH'], image: 'https://picsum.photos/seed/croffle/400/300' },
  { id: 'w14', name: '잠봉뵈르', description: '햄과 버터의 심플하고 깊은 맛', category: 'WESTERN', times: ['LUNCH'], image: 'https://picsum.photos/seed/jambon/400/300' },
  { id: 'j13', name: '후토마끼', description: '다양한 재료를 듬뿍 넣은 대왕 김밥', category: 'JAPANESE', times: ['LUNCH', 'DINNER'], image: 'https://picsum.photos/seed/futomaki/400/300' },
  { id: 'j14', name: '모찌', description: '쫄깃하고 달콤한 일본식 떡', category: 'JAPANESE', times: ['MORNING', 'LUNCH'], image: 'https://picsum.photos/seed/mochi/400/300' },
  { id: 'k21', name: '치즈 닭갈비', description: '매콤한 닭갈비와 고소한 치즈의 만남', category: 'KOREAN', times: ['DINNER'], image: 'https://picsum.photos/seed/dakgalbi/400/300' },
];
