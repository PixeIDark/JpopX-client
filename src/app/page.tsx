"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast/useToast";

function HomePage() {
  const { toast } = useToast();

  const handleButtonClick = () => {
    toast({
      title: "알림",
      message: "작업이 완료되었습니다!",
      type: "error",
    });
  };

  return (
    <div>
      <Button>outline</Button>
      <Button variant="link">link</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="active" onClick={handleButtonClick}>
        active
      </Button>
      <Button variant="error" asChild>
        <Link href="/login">go to page</Link>
      </Button>
      <p>
        l lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
        ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
        ipsumlorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia
        pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante,
        dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac,
        dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus
        ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet
        ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam
        risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel
        laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur
        laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus,
        congue vel laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus
        efficitur laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce
        dui lectus, congue vel laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque
        dapibus efficitur laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna.
        Fusce dui lectus, congue vel laoreet ac, dictum vitae odio. Donec aliquet.Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis.
        Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a molestie consequat,
        ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae odio. Donec
        aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia pulvinar
        tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a
        molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae
        odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia
        pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante,
        dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac,
        dictum vitae odio. Donec aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus
        ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet
        ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam
        risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel
        laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur
        laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus,
        congue vel laoreet ac, dictum vitae odio. Donec aliquet.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus
        efficitur laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce
        dui lectus, congue vel laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque
        dapibus efficitur laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna.
        Fusce dui lectus, congue vel laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis.
        Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a molestie consequat,
        ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae odio. Donec
        aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor
        nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a molestie
        consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae odio.
        Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia pulvinar
        tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a
        molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae
        odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia
        pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante,
        dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac,
        dictum vitae odio. Donec aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus
        ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet
        ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam
        risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel
        laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur
        laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus,
        congue vel laoreet ac, dictum vitae odio. Donec aliquet.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus
        efficitur laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce
        dui lectus, congue vel laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque
        dapibus efficitur laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna.
        Fusce dui lectus, congue vel laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis.
        Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a molestie consequat,
        ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae odio. Donec
        aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor
        nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a molestie
        consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae odio.
        Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia pulvinar
        tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a
        molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae
        odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia
        pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante,
        dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac,
        dictum vitae odio. Donec aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus
        ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet
        ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam
        risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel
        laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur
        laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus,
        congue vel laoreet ac, dictum vitae odio. Donec aliquet.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus
        efficitur laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce
        dui lectus, congue vel laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque
        dapibus efficitur laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna.
        Fusce dui lectus, congue vel laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis.
        Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a molestie consequat,
        ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae odio. Donec
        aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor
        nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a molestie
        consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae odio.
        Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia pulvinar
        tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a
        molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae
        odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia
        pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante,
        dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac,
        dictum vitae odio. Donec aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus
        ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet
        ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam
        risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel
        laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur
        laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus,
        congue vel laoreet ac, dictum vitae odio. Donec aliquet.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus
        efficitur laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce
        dui lectus, congue vel laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque
        dapibus efficitur laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna.
        Fusce dui lectus, congue vel laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis.
        Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a molestie consequat,
        ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae odio. Donec
        aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor
        nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a molestie
        consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae odio.
        Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia pulvinar
        tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a
        molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae
        odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia
        pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante,
        dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac,
        dictum vitae odio. Donec aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus
        ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet
        ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam
        risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel
        laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur
        laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus,
        congue vel laoreet ac, dictum vitae odio. Donec aliquet.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus
        efficitur laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce
        dui lectus, congue vel laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque
        dapibus efficitur laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna.
        Fusce dui lectus, congue vel laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis.
        Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a molestie consequat,
        ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae odio. Donec
        aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor
        nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a molestie
        consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae odio.
        Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia pulvinar
        tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a
        molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae
        odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia
        pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante,
        dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac,
        dictum vitae odio. Donec aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus
        ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet
        ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam
        risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel
        laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus efficitur
        laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus,
        congue vel laoreet ac, dictum vitae odio. Donec aliquet.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque dapibus
        efficitur laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna. Fusce
        dui lectus, congue vel laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis. Pellentesque
        dapibus efficitur laoreet. Nam risus ante, dapibus a molestie consequat, ultrices ac magna.
        Fusce dui lectus, congue vel laoreet ac, dictum vitae odio. Donec aliquet. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor nec facilisis.
        Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a molestie consequat,
        ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae odio. Donec
        aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia pulvinar tortor
        nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a molestie
        consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae odio.
        Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia pulvinar
        tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante, dapibus a
        molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac, dictum vitae
        odio. Donec aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia
        pulvinar tortor nec facilisis. Pellentesque dapibus efficitur laoreet. Nam risus ante,
        dapibus a molestie consequat, ultrices ac magna. Fusce dui lectus, congue vel laoreet ac,
        dictum vitae odio. Donec aliquet.
      </p>
    </div>
  );
}

export default HomePage;
