/* @license
 * Copyright (c) 2016, Jeff Hlywa (jhlywa@gmail.com)
 * Released under the BSD license
 * https://github.com/jhlywa/chess.js/blob/master/LICENSE
 */
var Chess = function(r) {
    var e = "b"
        , n = "w"
        , t = -1
        , o = "p"
        , i = "n"
        , f = "b"
        , a = "r"
        , u = "q"
        , l = "k"
        , s = "pnbrqkPNBRQK"
        , p = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        , c = ["1-0", "0-1", "1/2-1/2", "*"]
        , v = {
        b: [16, 32, 17, 15],
        w: [-16, -32, -17, -15]
    }
        , g = {
        n: [-18, -33, -31, -14, 18, 33, 31, 14],
        b: [-17, -15, 17, 15],
        r: [-16, 1, 16, -1],
        q: [-17, -16, -15, 1, 17, 16, 15, -1],
        k: [-17, -16, -15, 1, 17, 16, 15, -1]
    }
        , h = [20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0, 24, 24, 24, 24, 24, 24, 56, 0, 56, 24, 24, 24, 24, 24, 24, 0, 0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20]
        , E = [17, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 15, 0, 0, 17, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 17, 0, 0, 0, 0, 16, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 16, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 16, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 16, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 16, 15, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -15, -16, -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, -16, 0, -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, 0, -16, 0, 0, -17, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, 0, 0, -16, 0, 0, 0, -17, 0, 0, 0, 0, 0, 0, -15, 0, 0, 0, 0, -16, 0, 0, 0, 0, -17, 0, 0, 0, 0, -15, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, -17, 0, 0, -15, 0, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, 0, -17]
        , d = {
        p: 0,
        n: 1,
        b: 2,
        r: 3,
        q: 4,
        k: 5
    }
        , b = {
        NORMAL: "n",
        CAPTURE: "c",
        BIG_PAWN: "b",
        EP_CAPTURE: "e",
        PROMOTION: "p",
        KSIDE_CASTLE: "k",
        QSIDE_CASTLE: "q"
    }
        , _ = {
        NORMAL: 1,
        CAPTURE: 2,
        BIG_PAWN: 4,
        EP_CAPTURE: 8,
        PROMOTION: 16,
        KSIDE_CASTLE: 32,
        QSIDE_CASTLE: 64
    }
        , A = 7
        , S = 6
        , m = 1
        , C = 0
        , y = {
        a8: 0,
        b8: 1,
        c8: 2,
        d8: 3,
        e8: 4,
        f8: 5,
        g8: 6,
        h8: 7,
        a7: 16,
        b7: 17,
        c7: 18,
        d7: 19,
        e7: 20,
        f7: 21,
        g7: 22,
        h7: 23,
        a6: 32,
        b6: 33,
        c6: 34,
        d6: 35,
        e6: 36,
        f6: 37,
        g6: 38,
        h6: 39,
        a5: 48,
        b5: 49,
        c5: 50,
        d5: 51,
        e5: 52,
        f5: 53,
        g5: 54,
        h5: 55,
        a4: 64,
        b4: 65,
        c4: 66,
        d4: 67,
        e4: 68,
        f4: 69,
        g4: 70,
        h4: 71,
        a3: 80,
        b3: 81,
        c3: 82,
        d3: 83,
        e3: 84,
        f3: 85,
        g3: 86,
        h3: 87,
        a2: 96,
        b2: 97,
        c2: 98,
        d2: 99,
        e2: 100,
        f2: 101,
        g2: 102,
        h2: 103,
        a1: 112,
        b1: 113,
        c1: 114,
        d1: 115,
        e1: 116,
        f1: 117,
        g1: 118,
        h1: 119
    }
        , T = {
        w: [{
            square: y.a1,
            flag: _.QSIDE_CASTLE
        }, {
            square: y.h1,
            flag: _.KSIDE_CASTLE
        }],
        b: [{
            square: y.a8,
            flag: _.QSIDE_CASTLE
        }, {
            square: y.h8,
            flag: _.KSIDE_CASTLE
        }]
    }
        , I = new Array(128)
        , P = {
        w: t,
        b: t
    }
        , w = n
        , L = {
        w: 0,
        b: 0
    }
        , R = t
        , N = 0
        , O = 1
        , k = []
        , q = {};
    function D() {
        I = new Array(128),
            P = {
                w: t,
                b: t
            },
            w = n,
            L = {
                w: 0,
                b: 0
            },
            R = t,
            N = 0,
            O = 1,
            k = [],
            q = {},
            j(x())
    }
    function K() {
        Q(p)
    }
    function Q(r) {
        var o = r.split(/\s+/)
            , i = o[0]
            , f = 0;
        if (!U(r).valid)
            return !1;
        D();
        for (var a = 0; a < i.length; a++) {
            var u = i.charAt(a);
            if ("/" === u)
                f += 8;
            else if (-1 !== "0123456789".indexOf(u))
                f += parseInt(u, 10);
            else {
                var l = u < "a" ? n : e;
                M({
                    type: u.toLowerCase(),
                    color: l
                }, fr(f)),
                    f++
            }
        }
        return w = o[1],
        o[2].indexOf("K") > -1 && (L.w |= _.KSIDE_CASTLE),
        o[2].indexOf("Q") > -1 && (L.w |= _.QSIDE_CASTLE),
        o[2].indexOf("k") > -1 && (L.b |= _.KSIDE_CASTLE),
        o[2].indexOf("q") > -1 && (L.b |= _.QSIDE_CASTLE),
            R = "-" === o[3] ? t : y[o[3]],
            N = parseInt(o[4], 10),
            O = parseInt(o[5], 10),
            j(x()),
            !0
    }
    function U(r) {
        var e = "No errors."
            , n = "FEN string must contain six space-delimited fields."
            , t = "6th field (move number) must be a positive integer."
            , o = "5th field (half move counter) must be a non-negative integer."
            , i = "4th field (en-passant square) is invalid."
            , f = "3rd field (castling availability) is invalid."
            , a = "2nd field (side to move) is invalid."
            , u = "1st field (piece positions) does not contain 8 '/'-delimited rows."
            , l = "1st field (piece positions) is invalid [consecutive numbers]."
            , s = "1st field (piece positions) is invalid [invalid piece]."
            , p = "1st field (piece positions) is invalid [row too large]."
            , c = "Illegal en-passant square"
            , v = r.split(/\s+/);
        if (6 !== v.length)
            return {
                valid: !1,
                error_number: 1,
                error: n
            };
        if (isNaN(v[5]) || parseInt(v[5], 10) <= 0)
            return {
                valid: !1,
                error_number: 2,
                error: t
            };
        if (isNaN(v[4]) || parseInt(v[4], 10) < 0)
            return {
                valid: !1,
                error_number: 3,
                error: o
            };
        if (!/^(-|[abcdefgh][36])$/.test(v[3]))
            return {
                valid: !1,
                error_number: 4,
                error: i
            };
        if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(v[2]))
            return {
                valid: !1,
                error_number: 5,
                error: f
            };
        if (!/^(w|b)$/.test(v[1]))
            return {
                valid: !1,
                error_number: 6,
                error: a
            };
        var g = v[0].split("/");
        if (8 !== g.length)
            return {
                valid: !1,
                error_number: 7,
                error: u
            };
        for (var h = 0; h < g.length; h++) {
            for (var E = 0, d = !1, b = 0; b < g[h].length; b++)
                if (isNaN(g[h][b])) {
                    if (!/^[prnbqkPRNBQK]$/.test(g[h][b]))
                        return {
                            valid: !1,
                            error_number: 9,
                            error: s
                        };
                    E += 1,
                        d = !1
                } else {
                    if (d)
                        return {
                            valid: !1,
                            error_number: 8,
                            error: l
                        };
                    E += parseInt(g[h][b], 10),
                        d = !0
                }
            if (8 !== E)
                return {
                    valid: !1,
                    error_number: 10,
                    error: p
                }
        }
        return "3" == v[3][1] && "w" == v[1] || "6" == v[3][1] && "b" == v[1] ? {
            valid: !1,
            error_number: 11,
            error: c
        } : {
            valid: !0,
            error_number: 0,
            error: e
        }
    }
    function x() {
        for (var r = 0, o = "", i = y.a8; i <= y.h1; i++) {
            if (null == I[i])
                r++;
            else {
                r > 0 && (o += r,
                    r = 0);
                var f = I[i].color
                    , a = I[i].type;
                o += f === n ? a.toUpperCase() : a.toLowerCase()
            }
            i + 1 & 136 && (r > 0 && (o += r),
            i !== y.h1 && (o += "/"),
                r = 0,
                i += 8)
        }
        var u = "";
        L[n] & _.KSIDE_CASTLE && (u += "K"),
        L[n] & _.QSIDE_CASTLE && (u += "Q"),
        L[e] & _.KSIDE_CASTLE && (u += "k"),
        L[e] & _.QSIDE_CASTLE && (u += "q"),
            u = u || "-";
        var l = R === t ? "-" : fr(R);
        return [o, w, u, l, N, O].join(" ")
    }
    function $(r) {
        for (var e = 0; e < r.length; e += 2)
            "string" == typeof r[e] && "string" == typeof r[e + 1] && (q[r[e]] = r[e + 1]);
        return q
    }
    function j(r) {
        k.length > 0 || (r !== p ? (q.SetUp = "1",
            q.FEN = r) : (delete q.SetUp,
            delete q.FEN))
    }
    function B(r) {
        var e = I[y[r]];
        return e ? {
            type: e.type,
            color: e.color
        } : null
    }
    function M(r, e) {
        if (!("type"in r && "color"in r))
            return !1;
        if (-1 === s.indexOf(r.type.toLowerCase()))
            return !1;
        if (!(e in y))
            return !1;
        var n = y[e];
        return (r.type != l || P[r.color] == t || P[r.color] == n) && (I[n] = {
            type: r.type,
            color: r.color
        },
        r.type === l && (P[r.color] = n),
            j(x()),
            !0)
    }
    function G(r, e, n, t, i) {
        var f = {
            color: w,
            from: e,
            to: n,
            flags: t,
            piece: r[e].type
        };
        return i && (f.flags |= _.PROMOTION,
            f.promotion = i),
            r[n] ? f.captured = r[n].type : t & _.EP_CAPTURE && (f.captured = o),
            f
    }
    function F(r) {
        function e(r, e, n, t, l) {
            if (r[n].type !== o || or(t) !== C && or(t) !== A)
                e.push(G(r, n, t, l));
            else
                for (var s = [u, a, f, i], p = 0, c = s.length; p < c; p++)
                    e.push(G(r, n, t, l, s[p]))
        }
        var n = []
            , t = w
            , l = ar(t)
            , s = {
            b: m,
            w: S
        }
            , p = y.a8
            , c = y.h1
            , h = !1
            , E = !(void 0 !== r && "legal"in r) || r.legal;
        if (void 0 !== r && "square"in r) {
            if (!(r.square in y))
                return [];
            p = c = y[r.square],
                h = !0
        }
        for (var d = p; d <= c; d++)
            if (136 & d)
                d += 7;
            else {
                var b = I[d];
                if (null != b && b.color === t)
                    if (b.type === o) {
                        var T = d + v[t][0];
                        if (null == I[T]) {
                            e(I, n, d, T, _.NORMAL);
                            T = d + v[t][1];
                            s[t] === or(d) && null == I[T] && e(I, n, d, T, _.BIG_PAWN)
                        }
                        for (N = 2; N < 4; N++) {
                            136 & (T = d + v[t][N]) || (null != I[T] && I[T].color === l ? e(I, n, d, T, _.CAPTURE) : T === R && e(I, n, d, R, _.EP_CAPTURE))
                        }
                    } else
                        for (var N = 0, O = g[b.type].length; N < O; N++) {
                            var k = g[b.type][N];
                            for (T = d; !(136 & (T += k)); ) {
                                if (null != I[T]) {
                                    if (I[T].color === t)
                                        break;
                                    e(I, n, d, T, _.CAPTURE);
                                    break
                                }
                                if (e(I, n, d, T, _.NORMAL),
                                "n" === b.type || "k" === b.type)
                                    break
                            }
                        }
            }
        if (!h || c === P[t]) {
            if (L[t] & _.KSIDE_CASTLE) {
                var q = (D = P[t]) + 2;
                null != I[D + 1] || null != I[q] || Z(l, P[t]) || Z(l, D + 1) || Z(l, q) || e(I, n, P[t], q, _.KSIDE_CASTLE)
            }
            if (L[t] & _.QSIDE_CASTLE) {
                var D;
                q = (D = P[t]) - 2;
                null != I[D - 1] || null != I[D - 2] || null != I[D - 3] || Z(l, P[t]) || Z(l, D - 1) || Z(l, q) || e(I, n, P[t], q, _.QSIDE_CASTLE)
            }
        }
        if (!E)
            return n;
        var K = [];
        for (d = 0,
                 O = n.length; d < O; d++)
            er(n[d]),
            z(t) || K.push(n[d]),
                nr();
        return K
    }
    function W(r, e) {
        var n = "";
        if (r.flags & _.KSIDE_CASTLE)
            n = "O-O";
        else if (r.flags & _.QSIDE_CASTLE)
            n = "O-O-O";
        else {
            var t = function(r, e) {
                for (var n = F({
                    legal: !e
                }), t = r.from, o = r.to, i = r.piece, f = 0, a = 0, u = 0, l = 0, s = n.length; l < s; l++) {
                    var p = n[l].from
                        , c = n[l].to
                        , v = n[l].piece;
                    i === v && t !== p && o === c && (f++,
                    or(t) === or(p) && a++,
                    ir(t) === ir(p) && u++)
                }
                if (f > 0)
                    return a > 0 && u > 0 ? fr(t) : u > 0 ? fr(t).charAt(1) : fr(t).charAt(0);
                return ""
            }(r, e);
            r.piece !== o && (n += r.piece.toUpperCase() + t),
            r.flags & (_.CAPTURE | _.EP_CAPTURE) && (r.piece === o && (n += fr(r.from)[0]),
                n += "x"),
                n += fr(r.to),
            r.flags & _.PROMOTION && (n += "=" + r.promotion.toUpperCase())
        }
        return er(r),
        J() && (V() ? n += "#" : n += "+"),
            nr(),
            n
    }
    function H(r) {
        return r.replace(/=/, "").replace(/[+#]?[?!]*$/, "")
    }
    function Z(r, t) {
        for (var i = y.a8; i <= y.h1; i++)
            if (136 & i)
                i += 7;
            else if (null != I[i] && I[i].color === r) {
                var f = I[i]
                    , a = i - t
                    , u = a + 119;
                if (h[u] & 1 << d[f.type]) {
                    if (f.type === o) {
                        if (a > 0) {
                            if (f.color === n)
                                return !0
                        } else if (f.color === e)
                            return !0;
                        continue
                    }
                    if ("n" === f.type || "k" === f.type)
                        return !0;
                    for (var l = E[u], s = i + l, p = !1; s !== t; ) {
                        if (null != I[s]) {
                            p = !0;
                            break
                        }
                        s += l
                    }
                    if (!p)
                        return !0
                }
            }
        return !1
    }
    function z(r) {
        return Z(ar(r), P[r])
    }
    function J() {
        return z(w)
    }
    function V() {
        return J() && 0 === F().length
    }
    function X() {
        return !J() && 0 === F().length
    }
    function Y() {
        for (var r = {}, e = [], n = 0, t = 0, o = y.a8; o <= y.h1; o++)
            if (t = (t + 1) % 2,
            136 & o)
                o += 7;
            else {
                var a = I[o];
                a && (r[a.type] = a.type in r ? r[a.type] + 1 : 1,
                a.type === f && e.push(t),
                    n++)
            }
        if (2 === n)
            return !0;
        if (3 === n && (1 === r[f] || 1 === r[i]))
            return !0;
        if (n === r[f] + 2) {
            var u = 0
                , l = e.length;
            for (o = 0; o < l; o++)
                u += e[o];
            if (0 === u || u === l)
                return !0
        }
        return !1
    }
    function rr() {
        for (var r = [], e = {}, n = !1; ; ) {
            var t = nr();
            if (!t)
                break;
            r.push(t)
        }
        for (; ; ) {
            var o = x().split(" ").slice(0, 4).join(" ");
            if (e[o] = o in e ? e[o] + 1 : 1,
            e[o] >= 3 && (n = !0),
                !r.length)
                break;
            er(r.pop())
        }
        return n
    }
    function er(r) {
        var n = w
            , i = ar(n);
        if (function(r) {
            k.push({
                move: r,
                kings: {
                    b: P.b,
                    w: P.w
                },
                turn: w,
                castling: {
                    b: L.b,
                    w: L.w
                },
                ep_square: R,
                half_moves: N,
                move_number: O
            })
        }(r),
            I[r.to] = I[r.from],
            I[r.from] = null,
        r.flags & _.EP_CAPTURE && (w === e ? I[r.to - 16] = null : I[r.to + 16] = null),
        r.flags & _.PROMOTION && (I[r.to] = {
            type: r.promotion,
            color: n
        }),
        I[r.to].type === l) {
            if (P[I[r.to].color] = r.to,
            r.flags & _.KSIDE_CASTLE) {
                var f = r.to - 1
                    , a = r.to + 1;
                I[f] = I[a],
                    I[a] = null
            } else if (r.flags & _.QSIDE_CASTLE) {
                f = r.to + 1,
                    a = r.to - 2;
                I[f] = I[a],
                    I[a] = null
            }
            L[n] = ""
        }
        if (L[n])
            for (var u = 0, s = T[n].length; u < s; u++)
                if (r.from === T[n][u].square && L[n] & T[n][u].flag) {
                    L[n] ^= T[n][u].flag;
                    break
                }
        if (L[i])
            for (u = 0,
                     s = T[i].length; u < s; u++)
                if (r.to === T[i][u].square && L[i] & T[i][u].flag) {
                    L[i] ^= T[i][u].flag;
                    break
                }
        R = r.flags & _.BIG_PAWN ? "b" === w ? r.to - 16 : r.to + 16 : t,
            r.piece === o ? N = 0 : r.flags & (_.CAPTURE | _.EP_CAPTURE) ? N = 0 : N++,
        w === e && O++,
            w = ar(w)
    }
    function nr() {
        var r = k.pop();
        if (null == r)
            return null;
        var n = r.move;
        P = r.kings,
            w = r.turn,
            L = r.castling,
            R = r.ep_square,
            N = r.half_moves,
            O = r.move_number;
        var t, i, f = w, a = ar(w);
        if (I[n.from] = I[n.to],
            I[n.from].type = n.piece,
            I[n.to] = null,
        n.flags & _.CAPTURE)
            I[n.to] = {
                type: n.captured,
                color: a
            };
        else if (n.flags & _.EP_CAPTURE) {
            var u;
            u = f === e ? n.to - 16 : n.to + 16,
                I[u] = {
                    type: o,
                    color: a
                }
        }
        n.flags & (_.KSIDE_CASTLE | _.QSIDE_CASTLE) && (n.flags & _.KSIDE_CASTLE ? (t = n.to + 1,
            i = n.to - 1) : n.flags & _.QSIDE_CASTLE && (t = n.to - 2,
            i = n.to + 1),
            I[t] = I[i],
            I[i] = null);
        return n
    }
    function tr(r, e) {
        var n = H(r);
        if (e) {
            var t = n.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);
            if (t)
                var o = t[1]
                    , i = t[2]
                    , f = t[3]
                    , a = t[4]
        }
        for (var u = F(), l = 0, s = u.length; l < s; l++) {
            if (n === H(W(u[l])) || e && n === H(W(u[l], !0)))
                return u[l];
            if (t && (!o || o.toLowerCase() == u[l].piece) && y[i] == u[l].from && y[f] == u[l].to && (!a || a.toLowerCase() == u[l].promotion))
                return u[l]
        }
        return null
    }
    function or(r) {
        return r >> 4
    }
    function ir(r) {
        return 15 & r
    }
    function fr(r) {
        var e = ir(r)
            , n = or(r);
        return "abcdefgh".substring(e, e + 1) + "87654321".substring(n, n + 1)
    }
    function ar(r) {
        return r === n ? e : n
    }
    function ur(r) {
        var e = function r(e) {
            var n = e instanceof Array ? [] : {};
            for (var t in e)
                n[t] = "object" == typeof t ? r(e[t]) : e[t];
            return n
        }(r);
        e.san = W(e, !1),
            e.to = fr(e.to),
            e.from = fr(e.from);
        var n = "";
        for (var t in _)
            _[t] & e.flags && (n += b[t]);
        return e.flags = n,
            e
    }
    function lr(r) {
        return r.replace(/^\s+|\s+$/g, "")
    }
    return Q(void 0 === r ? p : r),
        {
            WHITE: n,
            BLACK: e,
            PAWN: o,
            KNIGHT: i,
            BISHOP: f,
            ROOK: a,
            QUEEN: u,
            KING: l,
            SQUARES: function() {
                for (var r = [], e = y.a8; e <= y.h1; e++)
                    136 & e ? e += 7 : r.push(fr(e));
                return r
            }(),
            FLAGS: b,
            load: function(r) {
                return Q(r)
            },
            reset: function() {
                return K()
            },
            moves: function(r) {
                for (var e = F(r), n = [], t = 0, o = e.length; t < o; t++)
                    void 0 !== r && "verbose"in r && r.verbose ? n.push(ur(e[t])) : n.push(W(e[t], !1));
                return n
            },
            in_check: function() {
                return J()
            },
            in_checkmate: function() {
                return V()
            },
            in_stalemate: function() {
                return X()
            },
            in_draw: function() {
                return N >= 100 || X() || Y() || rr()
            },
            insufficient_material: function() {
                return Y()
            },
            in_threefold_repetition: function() {
                return rr()
            },
            game_over: function() {
                return N >= 100 || V() || X() || Y() || rr()
            },
            validate_fen: function(r) {
                return U(r)
            },
            fen: function() {
                return x()
            },
            pgn: function(r) {
                var e = "object" == typeof r && "string" == typeof r.newline_char ? r.newline_char : "\n"
                    , n = "object" == typeof r && "number" == typeof r.max_width ? r.max_width : 0
                    , t = []
                    , o = !1;
                for (var i in q)
                    t.push("[" + i + ' "' + q[i] + '"]' + e),
                        o = !0;
                o && k.length && t.push(e);
                for (var f = []; k.length > 0; )
                    f.push(nr());
                for (var a = [], u = ""; f.length > 0; ) {
                    var l = f.pop();
                    k.length || "b" !== l.color ? "w" === l.color && (u.length && a.push(u),
                        u = O + ".") : u = O + ". ...",
                        u = u + " " + W(l, !1),
                        er(l)
                }
                if (u.length && a.push(u),
                void 0 !== q.Result && a.push(q.Result),
                0 === n)
                    return t.join("") + a.join(" ");
                var s = 0;
                for (i = 0; i < a.length; i++)
                    s + a[i].length > n && 0 !== i ? (" " === t[t.length - 1] && t.pop(),
                        t.push(e),
                        s = 0) : 0 !== i && (t.push(" "),
                        s++),
                        t.push(a[i]),
                        s += a[i].length;
                return t.join("")
            },
            load_pgn: function(r, e) {
                var n = void 0 !== e && "sloppy"in e && e.sloppy;
                function t(r) {
                    return r.replace(/\\/g, "\\")
                }
                var o = "object" == typeof e && "string" == typeof e.newline_char ? e.newline_char : "\r?\n"
                    , i = new RegExp("^(\\[(.|" + t(o) + ")*\\])(" + t(o) + ")*1.(" + t(o) + "|.)*$","g")
                    , f = r.replace(i, "$1");
                "[" !== f[0] && (f = ""),
                    K();
                var a = function(r, e) {
                    for (var n = "object" == typeof e && "string" == typeof e.newline_char ? e.newline_char : "\r?\n", o = {}, i = r.split(new RegExp(t(n))), f = "", a = "", u = 0; u < i.length; u++)
                        f = i[u].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, "$1"),
                            a = i[u].replace(/^\[[A-Za-z]+\s"(.*)"\]$/, "$1"),
                        lr(f).length > 0 && (o[f] = a);
                    return o
                }(f, e);
                for (var u in a)
                    $([u, a[u]]);
                if ("1" === a.SetUp && !("FEN"in a && Q(a.FEN)))
                    return !1;
                var l = r.replace(f, "").replace(new RegExp(t(o),"g"), " ");
                l = l.replace(/(\{[^}]+\})+?/g, "");
                for (var s = /(\([^\(\)]+\))+?/g; s.test(l); )
                    l = l.replace(s, "");
                var p = lr(l = (l = (l = l.replace(/\d+\.(\.\.)?/g, "")).replace(/\.\.\./g, "")).replace(/\$\d+/g, "")).split(new RegExp(/\s+/));
                p = p.join(",").replace(/,,+/g, ",").split(",");
                for (var v = "", g = 0; g < p.length - 1; g++) {
                    if (null == (v = tr(p[g], n)))
                        return !1;
                    er(v)
                }
                if (v = p[p.length - 1],
                c.indexOf(v) > -1)
                    (function(r) {
                            for (var e in r)
                                return !0;
                            return !1
                        }
                    )(q) && void 0 === q.Result && $(["Result", v]);
                else {
                    if (null == (v = tr(v, n)))
                        return !1;
                    er(v)
                }
                return !0
            },
            header: function() {
                return $(arguments)
            },
            ascii: function() {
                return function() {
                    for (var r = "   +------------------------+\n", e = y.a8; e <= y.h1; e++) {
                        if (0 === ir(e) && (r += " " + "87654321"[or(e)] + " |"),
                        null == I[e])
                            r += " . ";
                        else {
                            var t = I[e].type;
                            r += " " + (I[e].color === n ? t.toUpperCase() : t.toLowerCase()) + " "
                        }
                        e + 1 & 136 && (r += "|\n",
                            e += 8)
                    }
                    return r += "   +------------------------+\n",
                        r += "     a  b  c  d  e  f  g  h\n"
                }()
            },
            turn: function() {
                return w
            },
            move: function(r, e) {
                var n = void 0 !== e && "sloppy"in e && e.sloppy
                    , t = null;
                if ("string" == typeof r)
                    t = tr(r, n);
                else if ("object" == typeof r)
                    for (var o = F(), i = 0, f = o.length; i < f; i++)
                        if (!(r.from !== fr(o[i].from) || r.to !== fr(o[i].to) || "promotion"in o[i] && r.promotion !== o[i].promotion)) {
                            t = o[i];
                            break
                        }
                if (!t)
                    return null;
                var a = ur(t);
                return er(t),
                    a
            },
            undo: function() {
                var r = nr();
                return r ? ur(r) : null
            },
            clear: function() {
                return D()
            },
            put: function(r, e) {
                return M(r, e)
            },
            get: function(r) {
                return B(r)
            },
            remove: function(r) {
                return function(r) {
                    var e = B(r);
                    return I[y[r]] = null,
                    e && e.type === l && (P[e.color] = t),
                        j(x()),
                        e
                }(r)
            },
            perft: function(r) {
                return function r(e) {
                    for (var n = F({
                        legal: !1
                    }), t = 0, o = w, i = 0, f = n.length; i < f; i++)
                        er(n[i]),
                        z(o) || (e - 1 > 0 ? t += r(e - 1) : t++),
                            nr();
                    return t
                }(r)
            },
            square_color: function(r) {
                if (r in y) {
                    var e = y[r];
                    return (or(e) + ir(e)) % 2 == 0 ? "light" : "dark"
                }
                return null
            },
            history: function(r) {
                for (var e = [], n = [], t = (void 0 !== r && "verbose"in r && r.verbose); k.length > 0; )
                    e.push(nr());
                for (; e.length > 0; ) {
                    var o = e.pop();
                    t ? n.push(ur(o)) : n.push(W(o)),
                        er(o)
                }
                return n
            }
        }
};
"undefined" != typeof exports && (exports.Chess = Chess),
"undefined" != typeof define && define(function() {
    return Chess
});
